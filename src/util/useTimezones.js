import moment from 'moment-timezone';
import localization from 'moment/min/locales.min'; // include all locales
import {useRef} from 'react';
import {getLocales, getTimeZone} from 'react-native-localize';

const useTimezones = () => {
  const momentRef = useRef(null);

  const setTime = input => {
    const timeArr = input.split(/[:.]/);
    if (timeArr.length > 1) {
      var hours = parseInt(timeArr[0], 10);
      var minutes = parseInt(timeArr[1], 10);
      if (hours >= 0 && hours <= 24 && minutes >= 0 && minutes <= 59) {
        const isMeridiem_AM = /AM/.test(input.toUpperCase());
        const isMeridiem_PM = /PM/.test(input.toUpperCase());
        if ((isMeridiem_AM || isMeridiem_PM) && hours >= 1 && hours <= 12) {
          if (isMeridiem_PM && hours < 12) {
            hours += 12;
          } else if (isMeridiem_AM && hours === 12) {
            hours = 0;
          }
        }
        momentRef.current.set({hour: hours, minute: minutes});
      }
    }
  };

  const getLocaleTimeString = (tZoneStr = null) => {
    //const options = { hour: '2-digit', minute: '2-digit' };
    //const localeTime = dateObj.toLocaleTimeString([], options);
    if (!tZoneStr) {
      tZoneStr = getTimeZone();
      if (!isValidTimeZone(tZoneStr)) {
        tZoneStr = 'Europe/Helsinki';
      }
    }
    momentRef.current = moment().tz(tZoneStr);
    const localeTime = momentRef.current.format('LT');
    return localeTime;
  };

  const isValidTimeZone = tzone => {
    const isValid = moment.tz.names().includes(tzone);
    if (!isValid) return false;
    return true;
  };

  const getLocale = () => {
    const momentLocales = moment.locales();
    try {
      const locale = getLocales();
      if (momentLocales.includes(locale[0].languageTag.toLocaleLowerCase()))
        return locale[0].languageTag.toLocaleLowerCase();
      if (momentLocales.includes(locale[0].languageCode))
        return locale[0].languageCode;
      if (momentLocales.includes(locale[0].languageTag))
        return locale[0].languageTag;
      if (momentLocales.includes(locale[0].countryCode))
        return locale[0].countryCode;
      return 'en';
    } catch (err) {
      //console.log(err);
      return 'en';
    }
  };

  const setLocale = () => {
    const locale = getLocale();
    moment.updateLocale(locale, localization);
  };

  const getTimezone = () => {
    if (!momentRef.current) momentRef.current = moment();
    //const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const deviceTimeZone = getTimeZone();
    setLocale();

    if (!isValidTimeZone(deviceTimeZone)) {
      moment.tz('Europe/Helsinki');
      return 'Europe/Helsinki';
    }

    moment.tz(deviceTimeZone);
    return deviceTimeZone;
  };

  const toLocaleTimeString = (tZoneStr, dateObj = momentRef.current) => {
    try {
      //const localeTime =  dateObj.toLocaleTimeString([], options(tZoneStr));
      const localeTime = moment.tz(dateObj, tZoneStr).format('ddd, LT');
      return localeTime;
    } catch (err) {
      //console.log(err);
      return undefined;
    }
  };

  return {toLocaleTimeString, setTime, getTimezone, getLocaleTimeString};
};

export default useTimezones;
