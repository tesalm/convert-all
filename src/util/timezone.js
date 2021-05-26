import moment from 'moment-timezone';
import localization from 'moment/min/locales.min';  // include all locales
import * as RNLocalize from 'react-native-localize';

// show only hours and minutes, use options with the default locale - use an empty array
/*const options = (tZone) => {
  return {
    timeZone: tZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit'
  };
};*/

//var date = new Date();
var date = moment();

const setTime = (input) => {
  const timeArr = input.split(/[:.]/);
  if (timeArr.length > 1) {
    var hours = parseInt(timeArr[0], 10);
    var minutes = parseInt(timeArr[1], 10);
    if (hours >= 0 && hours <= 24 && minutes >= 0 && minutes <= 59) {
      //date.setHours(hours, minutes);
      const isMeridiem_AM = /AM/.test(input.toUpperCase());
      const isMeridiem_PM = /PM/.test(input.toUpperCase());
      if ((isMeridiem_AM || isMeridiem_PM) && hours >= 1 && hours <= 12) {
        if (isMeridiem_PM && hours < 12) { hours += 12 }
        else if (isMeridiem_AM && hours === 12) { hours = 0 }
      }
      date.set({ 'hour': hours, 'minute': minutes });
    };
  };
};

const getLocaleTimeString = (tZoneStr = null) => {
  //const options = { hour: '2-digit', minute: '2-digit' };
  //const localeTime = dateObj.toLocaleTimeString([], options);
  if (!tZoneStr) {
    tZoneStr = RNLocalize.getTimeZone();
    if (!isValidTimeZone(tZoneStr)) {
      tZoneStr = "Europe/Helsinki";
    }
  }
  date = moment().tz(tZoneStr);
  const localeTime = date.format('LT')
  return localeTime;
};

const isValidTimeZone = (tzone) => {
  const isValid = moment.tz.names().includes(tzone);
  if (!isValid) { return false; }
  return true;
};

const getLocale = () => {
  const momentLocales = moment.locales();
  try {
    const locale = RNLocalize.getLocales();
    if (momentLocales.includes(locale[0].languageTag.toLocaleLowerCase()))
      return locale[0].languageTag.toLocaleLowerCase();
    if (momentLocales.includes(locale[0].languageCode))
      return locale[0].languageCode;
    if (momentLocales.includes(locale[0].languageTag))
      return locale[0].languageTag;
    if (momentLocales.includes(locale[0].countryCode))
      return locale[0].countryCode;
    return 'en';
  }
  catch (err) {
    //console.log(err);
    return 'en';
  }
}

const setLocale = () => {
  const locale = getLocale();
  moment.updateLocale(locale, localization);
};

const getTimezone = () => {
  //const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const deviceTimeZone = RNLocalize.getTimeZone();
  setLocale();
  
  if (!isValidTimeZone(deviceTimeZone)) {
    moment.tz("Europe/Helsinki");
    return "Europe/Helsinki";
  }
  
  moment.tz(deviceTimeZone);
  return deviceTimeZone;
};

const toLocaleTimeString = (tZoneStr, dateObj = date) => {
  try {
    //const localeTime =  dateObj.toLocaleTimeString([], options(tZoneStr));
    const localeTime = moment.tz(dateObj, tZoneStr).format('ddd, LT');
    return localeTime;
  }
  catch(err) {
    //console.log(err);
    return undefined;
  }
};


export { toLocaleTimeString, setTime, getTimezone, getLocaleTimeString };