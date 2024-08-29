
const integerWithSpaces = (str) => {
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const floatWithSpaces = (str) => {
    var parts = str.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

const resultWithSpaces = (result) => {
  if (result === parseInt(result, 10).toString())
    return integerWithSpaces(result);
  else
    return floatWithSpaces(result);
}

// remove insignificant trailing zeros
const removeZeroes = (str) => {
  // return str.replace(/(?:\.0+|(\.\d+?)0+)$/, "$1");
  return str.replace(/(\.[0-9]*[1-9])0*|(\.0*)/, "$1");
}

const parseResult = (equation_temp_str, input, precision) => {
  if (isNaN(input)) input = '1';
  const equation_str = equation_temp_str.replace('n', input || '0');
  var result = parseFloat(eval(equation_str));
  result = removeZeroes(result.toPrecision(precision));
  result = resultWithSpaces(result);
  return result;
};

const parseCurrencyResult = (rate, input, precision) => {
  if (!input) input = '0';
  var result = rate * input;
  result = removeZeroes(result.toPrecision(precision));
  result = resultWithSpaces(result);
  return result;
};

const parseJSONtoFlatlist = (data, unitId) => {
  let flatlistData = [];
  const { systems, sys_id } = data.units;
  const { units } = data;

  sys_id.map((id, i) => (
    data[unitId][id].map((eq, j) => (
      j === 0 && i !== 0 && (
        flatlistData.push({
          id: systems[i],
          name: systems[i],
          equation: null,
          header: true
        })
      ),
      flatlistData.push({
        id: units[id + '_id'][j],
        name: units[id][j],
        equation: eq,
        header: false
      })
    ))
  ));
  return flatlistData;
};


export { parseResult, parseCurrencyResult, parseJSONtoFlatlist };