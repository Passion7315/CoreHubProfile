import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { SSRProvider } from "react-bootstrap";
import sal from "sal.js";
import { ThemeProvider } from "next-themes";
import { AuthContextProvider } from "@context/authContext";
import { SigningCosmWasmProvider } from "@context/cosmwasm";
import { Provider } from "react-redux";
import App from "./App"
import store from "../store";

import { useCookies, CookiesProvider } from 'react-cookie';


import "../assets/css/bootstrap.min.css";
import "../assets/css/feather.css";
import "../assets/css/modal-video.css";
import "react-toastify/dist/ReactToastify.css";
import "../assets/scss/style.scss";

const MyApp = ({ Component, pageProps }) => {
    const getLayout = Component.getLayout || ((page) => page);
    const router = useRouter();
    const [currentTheme, setCurrentTheme] = useState({});

    const [cookies, setCookie] = useCookies(['updateThemeFlag']);


    useEffect(() => {
        const theme = JSON.parse(localStorage.getItem('theme'));
        console.log('MyApp useEffect log - 1 : ', theme);
        if (theme && theme !== currentTheme) {
            setCurrentTheme(theme);
        }
    }, []);

    useEffect(() => {
        sal({ threshold: 0.1, once: true });
    }, [router.asPath]);

    useEffect(() => {
        sal();
    }, []);
    useEffect(() => {
        document.body.className = `${pageProps.className}`;
    });
    return (
        <SSRProvider>
            {getLayout(
                <ThemeProvider defaultTheme="dark">
                    <AuthContextProvider>
                        <SigningCosmWasmProvider>
                            <Provider store={store}>
                                <App/>
                                
                            </Provider>
                        </SigningCosmWasmProvider>
                    </AuthContextProvider>
                </ThemeProvider>
            )}
        </SSRProvider>
    );
};

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.shape({
        className: PropTypes.string,
    }),
};

export default MyApp;
