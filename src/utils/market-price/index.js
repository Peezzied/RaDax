async function fetchApi() {
    let res = await fetch('https://services.pdax.ph/api/liquidity/otc/v1/marketprices')
    let data = await res.json()

    let coin = data.result.find((i) => {
        return i.currencyPair === 'BTC_PHP'
    })
    let askBid = new BuySell(coin.ask, coin.bid)

    return { coin, askBid }
}

(async () => {
    const { coin, askBid } = await fetchApi();
    console.log(coin, askBid.buy(122));
})();