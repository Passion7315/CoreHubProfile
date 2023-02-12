import { useState, useEffect } from "react";
import { useCookies, CookiesProvider } from "react-cookie";

const Theme = () => {
    const [currentTheme, setCurrentTheme] = useState({});

    const [cookies, setCookie] = useCookies(["updateThemeFlag"]);

    useEffect(() => {
        const theme = JSON.parse(localStorage.getItem("theme"));
        console.log("MyApp useEffect log - 1 : ", theme);
        //      setCookie("updateThemeFlag", theme);
        if (theme && theme !== currentTheme) {
            setCurrentTheme(theme);
        }
    }, []);

    useEffect(() => {
        console.log("Cookies", cookies);
        if (cookies.updateThemeFlag != undefined) {
            const theme = JSON.parse(localStorage.getItem("theme"));
            console.log("MyApp useEffect log - 1 : ", theme);
            //      setCookie("updateThemeFlag", theme);
            if (theme && theme !== currentTheme) {
                setCurrentTheme(theme);
            }
        }
    }, [cookies]);

    return (
        <div
            style={{
                backgroundColor: currentTheme.backgroundColor,
                backgroundImage: `url("${currentTheme.backgroundImage}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100vw",
                height: "100vh",
                top: "0",
                position: "fixed",
                filter: `blur(${currentTheme.blurMode ? "7px" : "0px"})`,
            }}
        />
    );
};

export default Theme;
