import {ActionTypes} from './constants';
import {MeasureTypes} from '../general/measure-types';
import {parseJSONtoFlatlist} from '../util/parser';
import {getSortOrder} from '../util/sort';
import {getExchangeRatesApiAsync} from '../util/api';

function setLoading(dispatch) {
  dispatch({type: ActionTypes.SetLoading});
}

export function updateInput(dispatch, input) {
  dispatch({
    type: ActionTypes.UpdateInput,
    input: input,
  });
}

const getCurrencyData = async (dispatch, unit_id, curr_json) => {
  setLoading(dispatch);
  try {
    curr_json.main[unit_id] = curr_json.currencies[unit_id];
    curr_json['index'] = await getExchangeRatesApiAsync(
      unit_id,
      curr_json.main,
    );
    dispatch({
      type: ActionTypes.RequestCurrencyDataSuccess,
      data: curr_json.currenciesArray,
      quantJson: curr_json,
      unit: curr_json.main[unit_id],
      unitId: unit_id,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.RequestCurrencyDataFailure,
      error: error,
    });
  }
};

const getTimezoneName = (tz_json, tz_id) => {
  const {timezones, index} = tz_json;
  const i = timezones.findIndex(tz => tz.id === tz_id);
  // adds new tz to tz data objects, if tz_id is missing from json data
  if (i < 0) {
    const name = tz_id.split('/').pop();
    timezones.push({id: tz_id, name: name});
    index.push({id: tz_id, name: name});
    index.sort(getSortOrder('name'));
    return {name: name, quantJson: tz_json, data: timezones};
  } else {
    const name = timezones[i].name;
    const j = index.findIndex(tz => tz.id === tz_id);
    // adds tz to tz_json.index object, if tz_id is missing from tz_json.index
    if (j < 0) {
      index.push(timezones[i]);
      index.sort(getSortOrder('name'));
    }
    return {name: name, quantJson: tz_json, data: timezones};
  }
};

export function quantitySelectionHandler(ctx, quant_json, unit_id) {
  if (quant_json.units.measure === MeasureTypes.CURRENCY)
    getCurrencyData(ctx.dispatch, unit_id, quant_json);
  else if (quant_json.units.measure === MeasureTypes.TIMEZONE) {
    const timezone = ctx.getTimezone();
    const tzDataObject = getTimezoneName(quant_json, timezone);
    ctx.dispatch({
      type: ActionTypes.TimezoneSelection,
      data: tzDataObject.data,
      quantJson: tzDataObject.quantJson,
      input: ctx.getLocaleTimeString(),
      unit: tzDataObject.name,
      unitId: timezone,
    });
  } else
    ctx.dispatch({
      type: ActionTypes.QuantitySelection,
      data: parseJSONtoFlatlist(quant_json, unit_id),
      quantJson: quant_json,
      unit: quant_json[unit_id].unit,
      unitId: unit_id,
    });
}

export function unitSelectionHandler(ctx, unit_id, quant_json) {
  switch (quant_json.units.measure) {
    case MeasureTypes.CURRENCY:
      return getCurrencyData(ctx.dispatch, unit_id, quant_json);
    case MeasureTypes.TIMEZONE:
      const tzDataObject = getTimezoneName(quant_json, unit_id);
      return ctx.dispatch({
        type: ActionTypes.UpdateTimezoneData,
        data: tzDataObject.data,
        quantJson: tzDataObject.quantJson,
        input: ctx.getLocaleTimeString(unit_id),
        unit: tzDataObject.name,
        unitId: unit_id,
      });
    default:
      return ctx.dispatch({
        type: ActionTypes.UpdateQuantityData,
        data: parseJSONtoFlatlist(quant_json, unit_id),
        unit: quant_json[unit_id].unit,
        unitId: unit_id,
      });
  }
}
