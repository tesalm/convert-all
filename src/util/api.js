import { getSortOrder } from './sort';


async function getExchangeRatesApiAsync(base, currencies) {
  const apiKey = "ecfeee6458cd94af2430547c"
  try {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {"Cache-Control": "no-cache"},
    });
    if (!response.ok) throw "HTTP Request is not responding";
    const responseJson = await response.json();
    if (responseJson.result !== 'success') throw "Internal server error";

    const data = [];
    const symbols = Object.keys(responseJson.conversion_rates);
    symbols.map((symbol) => currencies[symbol] &&
        data.push({
          id: symbol,
          name: currencies[symbol],
          rate: responseJson.conversion_rates[symbol],
        }),
    );

    if (!data.find((e) => e.id === base))
      data.push({id: base, name: currency.main[base], rate: 1});

    data.sort(getSortOrder("name"));
    data[0]['date'] = new Date(
      responseJson.time_last_update_unix * 1000,
    ).toLocaleString();
    return data;

  } catch (error) {
    if (error.message) throw error.message;
    throw error;
  }
}

export { getExchangeRatesApiAsync };