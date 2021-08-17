import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import currencysJson from '../../assets/currency.json';
import quantitysJson from '../../assets/quantity.json';
import timezonesJson from '../../assets/timezone.json';
import { styles } from '../styles';
import { imgs } from '../general/images';
import CustomHeaderBar from '../components/HeaderBar';
import { quantitySelectionHandler } from '../redux/actions';


export class QuantitySelectionView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
  };

  styleHandler = (quant, selected) => {
    if (quant === selected) return styles.textSelected;
    else return styles.text;
  };

  selectionHandler = (quant_json, unit_id, is_currency = false, is_timezone = false) => {
    const { actions, measure, navigation } = this.props;
    if (measure !== quant_json.units.measure)
       actions.quantitySelectionHandler(quant_json, unit_id, is_currency, is_timezone);
    navigation.navigate("Main");
  };

  toTop = () => {
    this.scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
  };

  render() {
    const { measure, navigation } = this.props;
    return (
      <>
      <CustomHeaderBar navigation={navigation} title={'Measurements'} toTop={this.toTop}/>
      <View style={styles.container}>
        <ScrollView ref={this.scrollViewRef}>
          <View style={[styles.headerWithIcon, {marginTop:10}]}>
            <Image style={styles.measureIcon} source={imgs.molIcon}/>
            <Text style={styles.header1}>{'Chemistry'}</Text>
          </View>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.density, 'kgpcm')}>
            <Text style={this.styleHandler('Density', measure)}>Density</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.dynviscosity, 'pas')}>
            <Text style={this.styleHandler('Dynamic viscosity', measure)}>Dynamic viscosity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.kviscosity, 'smps')}>
            <Text style={this.styleHandler('Kinematic viscosity', measure)}>Kinematic viscosity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.molar, 'hydrogen')}>
            <Text style={this.styleHandler('Molar Mass', measure)}>Molar Mass</Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.comIcon}/>
            <Text style={styles.header1}>{'Computing'}</Text>
          </View>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.bandwidth, 'mbitpsec')}>
            <Text style={this.styleHandler('Bandwidth', measure)}>Bandwidth</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.data, 'kilobit')}>
            <Text style={this.styleHandler('Data storage', measure)}>Data storage</Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.dimIcon}/>
            <Text style={styles.header1}>{'Dimension'}</Text>
          </View>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.area, 'square_meter')}>
            <Text style={this.styleHandler('Area', measure)}>Area</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.length, 'MET')}>
            <Text style={this.styleHandler('Length', measure)}>Length</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.vol, 'litre')}>
            <Text style={this.styleHandler('Volume', measure)}>Volume</Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.elecIcon}/>
            <Text style={styles.header1}>{'Electricity'}</Text>
          </View>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.capacitance, 'farad')}>
            <Text style={this.styleHandler('Capacitance', measure)}>Capacitance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.echarge, 'coulomb')}>
            <Text style={this.styleHandler('Electric charge', measure)}>Electric charge</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.ecurrent, 'ampere')}>
            <Text style={this.styleHandler('Electric current', measure)}>Electric current</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.epotential, 'volt')}>
            <Text style={this.styleHandler('Electric potential', measure)}>Electric potential</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.econductance, 'siemens')}>
            <Text style={this.styleHandler('Electrical conductance', measure)}>Electrical conductance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.eresistance, 'ohm')}>
            <Text style={this.styleHandler('Electrical resistance', measure)}>Electrical resistance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.inductance, 'henry')}>
            <Text style={this.styleHandler('Inductance', measure)}>Inductance</Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.energyIcon}/>
            <Text style={styles.header1}>{'Energy'}</Text>
          </View>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.energy, 'joule')}>
            <Text style={this.styleHandler('Energy', measure)}>Energy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.power, 'horsepower')}>
            <Text style={this.styleHandler('Power', measure)}>Power</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.temp, 'celsius')}>
            <Text style={this.styleHandler('Temperature', measure)}>Temperature</Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.flowIcon}/>
            <Text style={styles.header1}>{'Flow rate'}</Text>
          </View>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.mflow, 'kgpsec')}>
            <Text style={this.styleHandler('Mass flow rate', measure)}>Mass flow rate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.volflow, 'cmpsec')}>
            <Text style={this.styleHandler('Volumetric flow rate', measure)}>Volumetric flow rate</Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.magIcon}/>
            <Text style={styles.header1}>{'Magnetism'}</Text>
          </View>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.mfield, 'tesla')}>
            <Text style={this.styleHandler('Magnetic field', measure)}>Magnetic field</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.mflux, 'weber')}>
            <Text style={this.styleHandler('Magnetic flux', measure)}>Magnetic flux</Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.mechIcon}/>
            <Text style={styles.header1}>{'Mechanics'}</Text>
          </View>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.force, 'newton')}>
            <Text style={this.styleHandler('Force', measure)}>Force</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.mass, 'KG')}>
            <Text style={this.styleHandler('Mass', measure)}>Mass</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.torque, 'newmet')}>
            <Text style={this.styleHandler('Torque', measure)}>Torque</Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.motionIcon}/>
            <Text style={styles.header1}>{'Motion'}</Text>
          </View>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.acceleration, 'mpss')}>
            <Text style={this.styleHandler('Acceleration', measure)}>Acceleration</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.speed, 'MPS')}>
            <Text style={this.styleHandler('Speed', measure)}>Speed</Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.radIcon}/>
            <Text style={styles.header1}>{'Radioactivity'}</Text>
          </View>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.rdose, 'gray')}>
            <Text style={this.styleHandler('Radiation', measure)}>Radiation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.radiodecay, 'becque')}>
            <Text style={this.styleHandler('Radioactive decay', measure)}>Radioactive decay</Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.timeIcon}/>
            <Text style={styles.header1}>{'Time'}</Text>
          </View>
          <TouchableOpacity style={styles.unit}
            onPress={() =>this.selectionHandler(quantitysJson.time, 'second')}>
            <Text style={this.styleHandler('Time', measure)}>Time</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(timezonesJson, null, false, true)}>
            <Text style={this.styleHandler('Time zones', measure)}>Time zones</Text>
          </TouchableOpacity>

          <Text style={styles.header}>{'Other'}</Text>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.angle, 'rotation')}>
            <Text style={this.styleHandler('Angle', measure)}>Angle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(currencysJson, 'EUR', true)}>
            <Text style={this.styleHandler('Currency', measure)}>Currency</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.freq, 'hertz')}>
            <Text style={this.styleHandler('Frequency', measure)}>Frequency</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.numerals, 'dec')}>
            <Text style={this.styleHandler('Numerals', measure)}>Numerals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.pressure, 'pascal')}>
            <Text style={this.styleHandler('Pressure', measure)}>Pressure</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unit}
            onPress={() => this.selectionHandler(quantitysJson.illuminance, 'lux')}>
            <Text style={this.styleHandler('Illuminance', measure)}>Illuminance</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      </>
    );
  }
}


const mapStateToProps = state => ({
  measure: state.main.quantJson.units.measure,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      quantitySelectionHandler: quantitySelectionHandler,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuantitySelectionView)
