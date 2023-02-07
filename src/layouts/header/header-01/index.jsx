import { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import axios from "axios";
import { useRouter } from "next/router";
import Logo from "@components/logo";
import MainMenu from "@components/menu/main-menu";
import MobileMenu from "@components/menu/mobile-menu";
import SearchForm from "@components/search-form/layout-01";
import FlyoutSearchForm from "@components/search-form/layout-02";
import UserDropdown from "@components/user-dropdown";
import Settings from "@components/settings";
import BurgerButton from "@ui/burger-button";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import { AiOutlineMessage } from "react-icons/ai";
import { useOffcanvas, useSticky, useFlyoutSearch } from "@hooks";
import headerData from "../../../data/general/header-01.json";
import menuData from "../../../data/general/menu-01.json";
import { useSigningClient } from "@context/cosmwasm";
import { useAuth } from "@context/authContext";
import { config } from "@utils/config";

const Header = ({ className }) => {
    const sticky = useSticky();
    const { offcanvas, offcanvasHandler } = useOffcanvas();
    const { search, searchHandler } = useFlyoutSearch();
    const { user, dispatch } = useAuth()
    const { loadClient, connectWallet, disconnect, walletAddress } = useSigningClient();
    const router = useRouter();
    const API_URL = config.API_URL;

    useEffect(() => {
        loadWeb3();
    }, []);

    useEffect(() => {
        if (walletAddress) {
            login(walletAddress, dispatch);
        }
    }, [walletAddress]);

    const loadWeb3 = async () => {
        await loadClient();

        let account = localStorage.getItem('address');
        if (account) {
            console.log('Address >>> ', account)
            await connectWallet();
        }
    }

    const authenticate = async () => {
        await connectWallet();
    }

    const unauthenticate = async () => {
        await disconnect();
        dispatch({ type: "LOGIN_OUT" });
        router.push({
            pathname: "/",
        });
    }

    const login = async (wallet, dispatch) => {
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.get(API_URL + "api/users/" + wallet);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        }
        catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err })
        }
    }

    return (
        <>
            <header
                className={clsx(
                    "rn-header haeder-default black-logo-version header--fixed header--sticky",
                    sticky && "sticky",
                    className
                )}
            >
                <div className="container">
                    <div className="header-inner">
                        <div className="header-left">
                            <Logo logo={headerData.logo} />
                            <div className="mainmenu-wrapper">
                                <nav
                                    id="sideNav"
                                    className="mainmenu-nav d-none d-xl-block"
                                >
                                    <MainMenu menu={menuData} />
                                </nav>
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="setting-option d-none d-lg-block">
                                <SearchForm />
                            </div>
                            <div className="setting-option rn-icon-list d-block d-lg-none">
                                <div className="icon-box search-mobile-icon">
                                    <button
                                        type="button"
                                        aria-label="Click here to open search form"
                                        onClick={searchHandler}
                                    >
                                        <i className="feather-search" />
                                    </button>
                                </div>
                                <FlyoutSearchForm isOpen={search} />
                            </div>

                            <div className="setting-option header-btn">
                                <div className="icon-box">
                                    {walletAddress ? (
                                        <Button
                                            color="primary-alta"
                                            className="connectBtn"
                                            size="small"
                                            onClick={() => unauthenticate()}
                                        >
                                            Disconnect
                                        </Button>
                                    ) : (
                                        <Button
                                            color="primary-alta"
                                            className="connectBtn"
                                            size="small"
                                            onClick={() => authenticate()}
                                        >
                                            Wallet connect
                                        </Button>
                                    )}
                                </div>
                            </div>
                            {walletAddress && (
                                <div className="setting-option rn-icon-list user-account">
                                    <UserDropdown />
                                </div>
                            )}
                            <div className="setting-option rn-icon-list notification-badge">
                                <div className="icon-box">
                                    <Anchor path={headerData.activity_link}>
                                        <i className="feather-bell" />
                                        <span className="badge">6</span>
                                    </Anchor>
                                </div>
                            </div>
                            <div className="setting-option rn-icon-list">
                                <div className="icon-box">
                                    <Anchor path={headerData.message_link}>
                                        <AiOutlineMessage size={20} />
                                    </Anchor>
                                </div>
                            </div>
                            <div className="setting-option mobile-menu-bar d-block d-xl-none">
                                <div className="hamberger">
                                    <BurgerButton onClick={offcanvasHandler} />
                                </div>
                            </div>
                            <div className="setting-option rn-icon-list user-account">
                                <Settings />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <MobileMenu
                isOpen={offcanvas}
                onClick={offcanvasHandler}
                menu={menuData}
                logo={headerData.logo}
            />
        </>
    );
};

Header.propTypes = {
    className: PropTypes.string,
};

export default Header;
