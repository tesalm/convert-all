import { ActionTypes } from './constants';
import { parseJSONtoFlatlist } from '../util/parser';
import quantitysJson from '../../assets/quantity.json';

const initialState = {
  input: '1',
  unitId: 'MET',
  quantJson: quantitysJson.length,
  unit: quantitysJson.length['MET'].unit,
  data: parseJSONtoFlatlist(quantitysJson.length, 'MET'),
  loading: false,
  error: undefined,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SetLoading:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case ActionTypes.RequestCurrencyDataSuccess:
      return {
        loading: false,
        error: undefined,
        data: action.data,
        quantJson: action.quantJson,
        input: '1',
        unit: action.unit,
        unitId: action.unitId,
      };
    case ActionTypes.RequestCurrencyDataFailure:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ActionTypes.UpdateQuantityData:
      return {
        ...state,
        data: action.data,
        unit: action.unit,
        unitId: action.unitId,
      };
    case ActionTypes.UpdateTimezoneData:
      return {
        ...state,
        data: action.data,
        quantJson: action.quantJson,
        input: action.input,
        unit: action.unit,
        unitId: action.unitId,
      };
    case ActionTypes.QuantitySelection:
      var val = '1';
      if (action.unitId === 'dec') val = '100';
      return {
        loading: false,
        error: undefined,
        data: action.data,
        quantJson: action.quantJson,
        input: val,
        unit: action.unit,
        unitId: action.unitId,
      };
    case ActionTypes.TimezoneSelection:
      return {
        loading: false,
        error: undefined,
        data: action.data,
        quantJson: action.quantJson,
        input: action.input,
        unit: action.unit,
        unitId: action.unitId,
      };
    case ActionTypes.UpdateInput:
      return {
        ...state,
        input: action.input,
      };
    default:
      return state;
  }
};

export default appReducer;
