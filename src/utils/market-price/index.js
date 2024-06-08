import { BuySell } from "./utils"

export const cryptoFetch = async () => {
    console.log('fetching crypto')
    let res = await fetch('https://services.pdax.ph/api/liquidity/otc/v1/marketprices')
    let data = await res.json()

    let coin = data.result.filter((i) => {
        return !i.currencyPair.includes('BILL') && i.currencyPair !== ''
    })
    // let askBid = new BuySell(coin.ask, coin.bid)
    console.log('cryptoFetch', coin)
    return coin
}

export const cryptoGet = async (get) => {
    console.log('getting crypto prices')
    let res = await fetch('https://services.pdax.ph/api/liquidity/otc/v1/marketprices')
    let data = await res.json()

    let coin = data.result.find((i) => {
        return i.tradedCurrency.name === get
    })
    let askBid = new BuySell(coin.ask, coin.bid)

    console.log('cryptoGet', coin)
    return askBid
}

// (async () => {
//     const askBid = await cryptoGet('BTC_PHP');
//     console.log(askBid.buy(122));
// })();