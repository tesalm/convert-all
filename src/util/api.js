import { getSortOrder } from './sort';


async function getExchangeRatesApi(base) {
  try {
    const url = `https://api.exchangeratesapi.io/latest?base=${base}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {'Cache-Control': 'no-cache'},
    });
    if (!response.ok) throw "HTTP Request is not responding";
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    if (error.message) throw error.message;
    throw error;
  }
}


function getExchangeRatesApiAsync(base, currencies) {
  return fetch(`https://api.exchangerate.host/latest?base=${base}&places=10`, {
    method: 'GET',
    headers: {'Cache-Control': 'no-cache'},
  })
    .then((response) => {
      if (!response.ok) throw 'HTTP Request is not responding';
      return response.json();
    })
    .then((responseJson) => {
      if (!responseJson.success) throw 'Internal server error';
      const data = [];
      const symbols = Object.keys(responseJson.rates);
      symbols.map((symbol) => currencies[symbol] &&
        data.push({
          id: symbol,
          name: currencies[symbol],
          rate: responseJson.rates[symbol],
        }),
      );
      if (!data.find((e) => e.id === base))
        data.push({id: base, name: currency.main[base], rate: 1});
      data.sort(getSortOrder('name'));
      data[0]['date'] = responseJson.date;
      return data;
    })
    .catch((error) => {
      if (error.message) throw error.message;
      throw error;
    });
}

export { getExchangeRatesApiAsync };