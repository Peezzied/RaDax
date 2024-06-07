export const cryptoFetch = async () => {
    console.log('fetching crypto')
    let res = await fetch('https://services.pdax.ph/api/liquidity/otc/v1/marketprices')
    let data = await res.json()asd

    let coin = data.result.filter((i) => {
        return !i.currencyPair.includes('BILL') && i.currencyPair !== ''
    })
    // let askBid = new BuySell(coin.ask, coin.bid)
    console.log('cryptoFetch', coin)
    return coin
}

// (async () => {
//     const { coin, askBid } = await fetchApi();
//     console.log(coin, askBid.buy(122));
// })();