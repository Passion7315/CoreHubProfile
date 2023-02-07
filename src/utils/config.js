const testnet = true;
export const config = {
    API_URL: "https://yourcorehub.com/",
    RPC_URL: testnet ? 'https://s-0.devnet-1.coreum.dev/' : '',
    REST_URL: testnet ? 'https://s-0.devnet-1.coreum.dev/rest/' : '',
    DATA_LAYER: testnet ? '' : '',
    FAUCET_URL: '',
    CHAIN_ID: testnet ? 'coreum-devnet-1' : '',
    CHAIN_NAME: testnet ? 'Coreum Devnet 1' : '',
    COIN_DENOM: 'DCORE',
    COIN_MINIMAL_DENOM: 'ducore',
    COIN_DECIMALS: 6,
    COIN_GECKOID: "coreum",
    PREFIX: 'devcore',
    AVG_GAS_STEP: 0.005,
}

export const chainConfig = {
    chainId: config.CHAIN_ID,
    chainName: config.CHAIN_NAME,
    rpc: config.RPC_URL,
    rest: config.REST_URL,
    stakeCurrency: {
        coinDenom: config.COIN_DENOM,
        coinMinimalDenom: config.COIN_MINIMAL_DENOM,
        coinDecimals: config.COIN_DECIMALS,
        coinGeckoId: config.COIN_GECKOID
    },
    bip44: {
        coinType: 990,
    },
    bech32Config: {
        bech32PrefixAccAddr: `${config.PREFIX}`,
        bech32PrefixAccPub: `${config.PREFIX}pub`,
        bech32PrefixValAddr: `${config.PREFIX}valoper`,
        bech32PrefixValPub: `${config.PREFIX}valoperpub`,
        bech32PrefixConsAddr: `${config.PREFIX}valcons`,
        bech32PrefixConsPub: `${config.PREFIX}valconspub`,
    },
    currencies: [
        {
            coinDenom: config.COIN_DENOM,
            coinMinimalDenom: config.COIN_MINIMAL_DENOM,
            coinDecimals: config.COIN_DECIMALS,
            coinGeckoId: config.COIN_GECKOID
        },
    ],
    feeCurrencies: [
        {
            coinDenom: config.COIN_DENOM,
            coinMinimalDenom: config.COIN_MINIMAL_DENOM,
            coinDecimals: config.COIN_DECIMALS,
            coinGeckoId: config.COIN_GECKOID,
            gasPriceStep: {
                low: 0.0625,
                average: 0.1,
                high: 62.5,
            },
        },
    ],
    coinType: 990,
    beta: true
}