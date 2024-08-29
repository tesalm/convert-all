import {useContext, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {MeasureTypes} from '../general/measure-types';
import {imgs} from '../general/images';
import PrecisionPicker from '../components/PrecisionPicker';
import ResultsView from '../components/Results';
import {styles} from '../styles';
import AppContext from '../store/appContext';
import {updateInput} from '../store/actions';

const Main = ({navigation, route}) => {
  const {state, dispatch, setTime, toLocaleTimeString} = useContext(AppContext);
  const [precision, setPrecision] = useState('4');
  const [scrollToTop, setScrollToTop] = useState(false);
  const {unit, unitId, data, loading, error, quantJson, input} = state;
  const disable = error || loading ? true : false;

  const inputHandler = raw_input => {
    var input = '';
    switch (quantJson.units.measure) {
      case MeasureTypes.NUMERAL:
        input = raw_input.replace(/[^0-9a-fA-F]/g, '');
        break;
      case MeasureTypes.TIMEZONE:
        input = raw_input.replace(/[^0-9.:apmAPM\s]/g, '');
        setTime(input);
        break;
      default:
        input = raw_input.replace(/[^0-9,.-]/g, '');
    }
    setScrollToTop(false);
    updateInput(dispatch, input.replace(',', '.'));
  };

  const unitsViewNavigator = () => {
    navigation.navigate('Units');
    setScrollToTop(true);
  };

  const quantitysViewNavigator = () => {
    navigation.navigate('Quantitys');
    setScrollToTop(true);
  };

  const precisionSelectionHandler = value => {
    setPrecision(value);
  };

  const getKeyboardType = unit_id => {
    const {measure} = quantJson.units;
    const numTypes = [
      'udec',
      'duodec',
      'tridec',
      'tetradec',
      'pentadec',
      'hexadec',
    ];

    if (measure === MeasureTypes.TIMEZONE || numTypes.includes(unit_id))
      return 'email-address';
    return 'numeric';
  };

  const isNotTimezoneOrNumeral = () => {
    const {measure} = quantJson.units;
    return (
      measure !== MeasureTypes.TIMEZONE && measure !== MeasureTypes.NUMERAL
    );
  };

  return (
    <View style={styles.mainViewContainer}>
      <View style={styles.inputRow1}>
        <TouchableOpacity
          style={disable ? styles.unitSelectionDisabled : styles.unitSelection}
          disabled={disable}
          onPress={unitsViewNavigator}>
          <Text numberOfLines={1} style={styles.textBold}>
            {unit}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={quantitysViewNavigator}>
          <Image style={styles.menuIcon} source={imgs.menuIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputRow2}>
        <TextInput
          style={styles.textInput}
          defaultValue={'1'}
          onChangeText={inputHandler}
          selectTextOnFocus={true}
          value={input}
          keyboardType={getKeyboardType(unitId)}
        />
        {isNotTimezoneOrNumeral() && (
          <PrecisionPicker
            precision={precision}
            selector={precisionSelectionHandler}
          />
        )}
      </View>

      <ResultsView
        input={input}
        precision={precision}
        data={quantJson.index ? quantJson.index : data}
        unitId={unitId}
        loading={loading}
        scrollToTop={scrollToTop}
        error={error}
        measure={quantJson.units.measure}
        toLocaleTimeString={toLocaleTimeString}
      />
    </View>
  );
};

export default Main;
