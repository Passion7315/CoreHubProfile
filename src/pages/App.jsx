
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { SSRProvider } from "react-bootstrap";
import sal from "sal.js";
import { ThemeProvider } from "next-themes";
import { AuthContextProvider } from "@context/authContext";
import { SigningCosmWasmProvider } from "@context/cosmwasm";
import { Provider } from "react-redux";
import store from "../store";
import { CookiesProvider } from "react-cookie";


const App = ({ Component, pageProps }) => {
    const getLayout = Component.getLayout || ((page) => page);
    const router = useRouter();
    const [currentTheme, setCurrentTheme] = useState({});

    const [cookies, setCookie] = useCookies(['updateThemeFlag']);


    useEffect(() => {
        const theme = JSON.parse(localStorage.getItem('theme'));
        console.log('App useEffect log - 1 : ', theme);
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
        <>
            <div style={{
                backgroundColor: currentTheme.backgroundColor,
                backgroundImage: `url("${currentTheme.backgroundImage}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '100vh',
                top: '0',
                position: 'fixed',
                filter: `blur(${currentTheme.blurMode ? '7px' : '0px'})`,
            }} />
            <Component {...pageProps} />
        </>
    );
};

App.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.shape({
        className: PropTypes.string,
    }),
};

export default App;
