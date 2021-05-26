import currency from '../../assets/currency.json';
import { getSortOrder } from './sort';

async function getExchangeRatesApi(base) {
  try {
    const response = await fetch(
      //'https://api.ratesapi.io/api/latest?base=' + base
      'https://api.exchangeratesapi.io/latest?base=' + base,
    );
    const responseJson = await response.json();
    //console.log(responseJson);
    return responseJson;
  } catch (error) {
    if (error.message) {
      return { "error": error.message }
    }
    return error;
  }
}

function getExchangeRatesApiAsync(base) {
  return fetch('https://api.exchangerate.host/latest?base=' + base)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.rates) {
        var data = [];
        const symbols = Object.keys(responseJson.rates);
        symbols.map((symbol) => (
          currency.currencys[symbol] !== undefined &&
          data.push({
            id: symbol,
            name: currency.currencys[symbol],
            rate: responseJson.rates[symbol]
          })
        ));
        if (!data.find(e => e.id === base))
          data.push({id:base, name:currency.currencys[base], rate:1});
        data.sort(getSortOrder('name'));
        data[0]['date'] = responseJson.date;
        return data;
      }
      return responseJson;
    })
    .catch((error) => {
      return error;
    });
}

export { getExchangeRatesApiAsync }
