import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateInput } from '../redux/actions';
import { MeasureTypes } from '../general/measure-types';
import { imgs } from '../general/images';
import PrecisionPicker from '../components/PrecisionPicker';
import ResultsView from '../components/Results';
import { styles } from '../styles';
import { setTime } from '../util/timezone';


export class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      precision: '4',
    };
    this.scrollToTop = false;
  };

  inputHandler = (raw_input) => {
    var input = '';
    const { quantJson, actions } = this.props;
    switch (quantJson.units.measure) {
      case MeasureTypes.NUMERAL:
        input = raw_input.replace(/[^0-9a-fA-F]/g, '');
        break;
      case MeasureTypes.TIMEZONE:
        input = raw_input.replace(/[^0-9.:apmAPM]/g, '');
        setTime(input);
        break;
      default:
        input = raw_input.replace(/[^0-9,.-]/g, '');
    }
    this.scrollToTop = false;
    actions.updateInput(input.replace(',', '.'));
  };

  unitsViewNavigator = () => {
    const { navigation } = this.props;
    navigation.navigate("Units");
    this.scrollToTop = true;
  };

  quantitysViewNavigator = () => {
    const { navigation } = this.props;
    navigation.navigate("Quantitys");
    this.scrollToTop = true;
  };

  precisionSelectionHandler = (value) => {
    this.setState({ precision: value });
  };

  getKeyboardType = (unit_id) => {
    const { measure } = this.props.quantJson.units;
    const numTypes = ["udec", "duodec", "tridec", "tetradec", "pentadec", "hexadec"];

    if (measure === MeasureTypes.TIMEZONE || numTypes.includes(unit_id))
      return "email-address";
    return "numeric";
  };
  
  render() {
    const { input, unit, unitId, data, loading, error, quantJson } = this.props;
    const { precision } = this.state;
    const disable = error || loading ? true : false;

    return (
      <View style={styles.mainViewContainer}>
        <View style={styles.inputRow1}>
          <TouchableOpacity style={disable ? styles.unitSelectionDisabled : styles.unitSelection}
            disabled={disable}
            onPress={this.unitsViewNavigator}>
            <Text numberOfLines={1} style={styles.textBold}>{unit}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton} onPress={this.quantitysViewNavigator}>
            <Image style={styles.menuIcon} source={imgs.menuIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputRow2}>
          <TextInput style={styles.textInput}
            defaultValue={'1'}
            onChangeText={this.inputHandler}
            selectTextOnFocus={true}
            value={input}
            keyboardType={this.getKeyboardType(unitId)}
          />
          <PrecisionPicker selector={this.precisionSelectionHandler} />
        </View>
        
        <ResultsView input={input}
          precision={precision}
          data={quantJson.index ? quantJson.index : data}
          unitId={unitId}
          loading={loading}
          scrollToTop={this.scrollToTop}
          error={error}
          measure={quantJson.units.measure} />
      </View>
    );
  }
}


const mapStateToProps = (state) => ({
  quantJson: state.main.quantJson,
  unitId: state.main.unitId,
  input: state.main.input,
  unit: state.main.unit,
  data: state.main.data,
  loading: state.main.loading,
  error: state.main.error,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      updateInput: updateInput,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main)
