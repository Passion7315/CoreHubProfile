import { useEffect, useState, useCallback } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import AirdropArea from "@containers/airdrop";
import axios from "axios";
// Demo data for the ranking page
import { config } from "@utils/config";
import { useSigningClient } from "@context/cosmwasm";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Product = () => {
    const API_URL = config.API_URL;
    const [airdropInfo, setAirdropInfo] = useState([]);
    const [airdropData, setAirdropData] = useState([]);
    const { walletAddress } = useSigningClient();

    useEffect(() => {
        fetchAirdrop();
    }, []);

    useEffect(() => {
        if (walletAddress) {
            fetchUserAirdrop(walletAddress);
        }
    }, [walletAddress])

    const fetchAirdrop = async () => {
        try {
            const response = await axios.get(API_URL + "api/airdropinfo");
            setAirdropInfo(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchUserAirdrop = async (address) => {
        try {
            const response = await axios.get(API_URL + "api/airdrop/" + address);
            setAirdropData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Wrapper>
            <SEO pageTitle="Top NFT" />
            <Header />
            <main id="main-content">
                <AirdropArea data={{ airdrop: airdropInfo, userData: airdropData }} />
            </main>
            <Footer />
        </Wrapper>
    )
};

export default Product;
