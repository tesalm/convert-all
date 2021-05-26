import { ActionTypes } from './constants';
import { MeasureTypes } from '../general/measure-types';
import { parseJSONtoFlatlist } from '../util/parser';
import { getLocaleTimeString, getTimezone } from '../util/timezone';
import { getSortOrder } from '../util/sort';
import { getExchangeRatesApiAsync } from '../util/api';


export function setLoading() {
  return {
    type: ActionTypes.SetLoading,
  };
}

export function requestCurrencyDataFailure(error) {
  return {
    type: ActionTypes.RequestCurrencyDataFailure,
    error: error,
  };
}

export function requestCurrencyDataSuccess(data, curr_json, unit_id) {
  return {
    type: ActionTypes.RequestCurrencyDataSuccess,
    data: data,
    quantJson: curr_json,
    unit: curr_json.currencys[unit_id],
    unitId: unit_id,
  };
}

export function updateInput(input) {
  return {
    type: ActionTypes.UpdateInput,
    input: input,
  };
}

const getCurrencyData = (unit_id, curr_json) => async dispatch => {
  dispatch(setLoading());
  try {
    const data = await getExchangeRatesApiAsync(unit_id);
    if (data.error) throw data.error;
    if (!(Array.isArray(data) && data.length)) throw "HTTP GET Request is not responding";
    dispatch(requestCurrencyDataSuccess(data, curr_json, unit_id));
  } catch (error) {
    dispatch(requestCurrencyDataFailure(error));
  }
};

const getTimezoneName = (tz_json, tz_id) => {
  const {timezones, index} = tz_json;
  const i = timezones.findIndex((tz) => tz.id === tz_id);
  // adds new tz to tz data objects, if tz_id is missing from json data
  if (i < 0) {
    const name = tz_id.split('/').pop();
    timezones.push({id: tz_id, name: name});
    index.push({id: tz_id, name: name});
    index.sort(getSortOrder('name'));
    return {name: name, quantJson: tz_json, data: timezones};
  } else {
    const name = timezones[i].name;
    const j = index.findIndex((tz) => tz.id === tz_id);
    // adds tz to tz_json.index object, if tz_id is missing from tz_json.index
    if (j < 0) {
      index.push(timezones[i]);
      index.sort(getSortOrder('name'));
    }
    return {name: name, quantJson: tz_json, data: timezones};
  }
};

export function setQuantityData(quant_json, unit_id) {
  return {
    type: ActionTypes.QuantitySelection,
    data: parseJSONtoFlatlist(quant_json, unit_id),
    quantJson: quant_json,
    unit: quant_json[unit_id].unit,
    unitId: unit_id,
  };
}

export function setTimeZoneData(quant_json) {
  const timezone = getTimezone();
  const tzDataObject = getTimezoneName(quant_json, timezone);
  return {
    type: ActionTypes.TimezoneSelection,
    data: tzDataObject.data,
    quantJson: tzDataObject.quantJson,
    input: getLocaleTimeString(),
    unit: tzDataObject.name,
    unitId: timezone,
  };
}

const getQuantityData = (quant_json, unit_id) => dispatch => {
  dispatch(setLoading());
  // Delay this action by fraction of a second
  setTimeout(() => {dispatch(setQuantityData(quant_json, unit_id))}, 100);
};

const getTimeZoneData = (quant_json) => dispatch => {
  dispatch(setLoading());
  setTimeout(() => {dispatch(setTimeZoneData(quant_json))}, 100);
};

export function quantitySelectionHandler (quant_json, unit_id, is_currency, is_timezone) {
  if (is_currency)
    return getCurrencyData(unit_id, quant_json);
  else if (is_timezone) {
    return getTimeZoneData(quant_json);
  } else 
    return getQuantityData(quant_json, unit_id);
};

export function unitSelectionHandler(unit_id, quant_json) {
  switch (quant_json.units.measure) {
    case MeasureTypes.CURRENCY:
      return getCurrencyData(unit_id, quant_json);
    case MeasureTypes.TIMEZONE:
      const tzDataObject = getTimezoneName(quant_json, unit_id);
      return {
        type: ActionTypes.UpdateTimezoneData,
        data: tzDataObject.data,
        quantJson: tzDataObject.quantJson,
        input: getLocaleTimeString(unit_id),
        unit: tzDataObject.name,
        unitId: unit_id,
      };
    default:
      return {
        type: ActionTypes.UpdateQuantityData,
        data: parseJSONtoFlatlist(quant_json, unit_id),
        unit: quant_json[unit_id].unit,
        unitId: unit_id,
      };
  }
};
