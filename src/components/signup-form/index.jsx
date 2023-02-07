import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import axios from "axios";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { config } from "@utils/config";

const SignupForm = ({ className }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)

    const API_URL = config.API_URL;

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        mode: "onChange",
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
        // eslint-disable-next-line no-console
        console.log(data);
        setIsLoading(true);

        const form = new FormData();
        form.append("username", data.firstName + ' ' + data.lastName);
        form.append("email", data.email);
        form.append("password", data.newPassword);

        try {
            const resp = await axios.post(API_URL + "api/auth/signup", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            router.push({
                pathname: "/login",
            });
        } catch (err) {
            console.log(err);
            // setError("Username Already Exist")
        }
        setIsLoading(false)
    };

    return (
        <div className={clsx("form-wrapper-one", className)}>
            <h4>Sign Up</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <label htmlFor="firstName" className="form-label">
                        First name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        {...register("firstName", {
                            required: "First name is required",
                        })}
                    />
                    {errors.firstName && (
                        <ErrorText>{errors.firstName?.message}</ErrorText>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="lastName" className="form-label">
                        Last name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        {...register("lastName", {
                            required: "Last name is required",
                        })}
                    />
                    {errors.sastName && (
                        <ErrorText>{errors.sastName?.message}</ErrorText>
                    )}
                </div>
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
                    <label htmlFor="newPassword" className="form-label">
                        Create Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        {...register("newPassword", {
                            required: "Password is required",
                        })}
                    />
                    {errors.newPassword && (
                        <ErrorText>{errors.newPassword?.message}</ErrorText>
                    )}
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="rePassword"
                        className="form-label"
                    >
                        Re Password
                    </label>
                    <input
                        type="password"
                        id="rePassword"
                        {...register("rePassword", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                                value === getValues("newPassword") ||
                                "The passwords do not match",
                        })}
                    />
                    {errors.rePassword && (
                        <ErrorText>
                            {errors.rePassword?.message}
                        </ErrorText>
                    )}
                </div>
                <div className="mb-5 rn-check-box">
                    <input
                        type="checkbox"
                        className="rn-check-box-input"
                        id="exampleCheck1"
                        {...register("exampleCheck1", {
                            required: "Checkbox is required",
                        })}
                    />
                    <label
                        className="rn-check-box-label"
                        htmlFor="exampleCheck1"
                    >
                        Allow to all tearms & Allow to all tearms & condition
                    </label>
                    <br />
                    {errors.exampleCheck1 && (
                        <ErrorText>{errors.exampleCheck1?.message}</ErrorText>
                    )}
                </div>
                <Button type="submit" size="medium" className="mr--15">
                    Sign Up
                </Button>
                <Button path="/login" color="primary-alta" size="medium">
                    Log In
                </Button>
            </form>
        </div>
    );
};

SignupForm.propTypes = {
    className: PropTypes.string,
};
export default SignupForm;
