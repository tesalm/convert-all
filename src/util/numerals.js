import numeralsJson from '../../assets/numerals.json';

/* Standard positional numeral systems:
*  Binary       base = 2
*  Ternary      base = 3
*  Quaternary   base = 4
*  Quinary      base = 5
*  Senary       base = 6
*  Septenary    base = 7
*  Octal        base = 8
*  Nonary       base = 9
*  Decimal      base = 10
*  Undecimal    base = 11
*  Duodecimal   base = 12
*  Tridecimal   base = 13
*  Hexadecimal  base = 16 */

const decimalToNumeral = (decimal, base) => {
  var quotient = decimal;
  var remainder = decimal;
  var numeral = '';
  while (quotient !== 0) {
    quotient = Math.trunc(quotient / base);
    remainder = Math.trunc(remainder - (quotient * base));
    switch (remainder) {
      case 10: numeral += 'A'; break;
      case 11: numeral += 'B'; break;
      case 12: numeral += 'C'; break;
      case 13: numeral += 'D'; break;
      case 14: numeral += 'E'; break;
      case 15: numeral += 'F'; break;
      default: numeral += remainder.toString(); break;
    }
    remainder = quotient;
  }
  numeral = numeral.split("").reverse().join("");
  return numeral;
};

const numeralToDecimal = (numeral, base) => {
  var n = 0; var j = 0;
  var decSum = 0;
  for (i=numeral.length-1; i >= 0; i--) {
    switch (numeral[j].toLowerCase()) {
      case 'a': n = 10; break;
      case 'b': n = 11; break;
      case 'c': n = 12; break;
      case 'd': n = 13; break;
      case 'e': n = 14; break;
      case 'f': n = 15; break;
      default:
        if (isNaN(parseInt(n,10))) { return '-'; }
        n = parseInt(numeral[j],10); break; // char to int
    }
    decSum += n * Math.trunc(Math.pow(base, i));
    j++;
  };
  return decSum;
};

const inputToNumeral = (input, base, numeral_id) => {
  const selectedNumeralBase = numeralsJson.numerals[numeral_id].base
  const decimal = parseInt(input, selectedNumeralBase);
  if (isNaN(decimal)) return '-';
  const numeral = decimalToNumeral(decimal, base);
  return numeral;
};


export { inputToNumeral };