Number.prototype.toComma = function () {
    const num = this
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
String.prototype.toComma = function () {
    const num = this
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
Number.prototype.toPercent = function () {
    const num = this
    return num.toFixed(2) + '%'
}
String.prototype.toPercent = function () {
    const num = this
    return num + '%'
}

const getDate = (unix) => {
    let d = new Date(unix * 1000)
    const hours = d.getHours() % 12 || 12;
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const seconds = d.getSeconds().toString().padStart(2, '0');
    const amPm = d.getHours() >= 12 ? 'pm' : 'am';

    const formattedTime = `${hours}:${minutes};${seconds} ${amPm}`;
    return formattedTime;
}

const getDifference = (buy, sell, type) => {
    let delta = Math.abs(buy - sell)
    let mean = (buy + sell) / 2

    switch (type) {
        case 'increase':
            return delta
        case 'decrease':
            return (delta / buy) * 100
        default:
            return (delta / mean) * 100
    }
}

export class BuySell {
    constructor(ask, bid) {
        this.ask = ask
        this.bid = bid
    }

    buy(amount) {
        return (amount / this.bid).toFixed(6)
    }
    sell(amount) {
        return (amount * this.ask)
    }
    boughtAt(amount) {
        let buy = amount / this.ask
        let sell = buy * this.bid
        // console.log(amount, sell)
        let result = [
            {
                type: 'raw',
                buy: amount,
                sell: sell,
                deviation: getDifference(amount, sell, 'increase'),
                increase: getDifference(amount, sell),
                decrease: getDifference(amount, sell, 'decrease'),
            },
            {
                type: 'string',
                buy: amount.toString(),
                sell: sell.toString(),
                deviation: getDifference(amount, sell, 'increase').toString(),
                increase: getDifference(amount, sell).toString().toPercent(),
                decrease: getDifference(amount, sell, 'decrease').toString().toPercent()
            },
            {
                type: 'simple',
                buy: amount.toComma(),
                sell: sell.toComma(),
                deviation: getDifference(amount, sell, 'increase').toComma(),
                increase: getDifference(amount, sell).toPercent(),
                decrease: getDifference(amount, sell, 'decrease').toPercent()
            }
        ]
        return result
    }


}