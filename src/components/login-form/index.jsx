import { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import axios from "axios";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { AuthContext } from "@context/authContext";
import { config } from "@utils/config";

const LoginForm = ({ className }) => {
    const router = useRouter();
    const { isFetching, dispatch } = useContext(AuthContext)

    const API_URL = config.API_URL;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });
    const onSubmit = (data, e) => {
        e.preventDefault();
        // eslint-disable-next-line no-console
        console.log(data);
        loginCall(data, dispatch)
    };

    const loginCall = async (userCredential, dispatch) => {
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(API_URL + "api/auth/signin", userCredential);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            router.push({
                pathname: "/",
            });
        }
        catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err })
        }
    }

    return (
        <div className={clsx("form-wrapper-one", className)}>
            <h4>Login</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "invalid email address",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorText>
                            {errors.email?.message}
                        </ErrorText>
                    )}
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="form-label"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && (
                        <ErrorText>
                            {errors.password?.message}
                        </ErrorText>
                    )}
                </div>
                <div className="mb-5 rn-check-box">
                    <input
                        type="checkbox"
                        className="rn-check-box-input"
                        id="exampleCheck1"
                        {...register("exampleCheck1")}
                    />
                    <label
                        className="rn-check-box-label"
                        htmlFor="exampleCheck1"
                    >
                        Remember me leter
                    </label>
                </div>
                <Button type="submit" size="medium" className="mr--15">
                    Log In
                </Button>
                <Button path="/sign-up" color="primary-alta" size="medium">
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    className: PropTypes.string,
};
export default LoginForm;
