import { useContext, useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import currenciesJson from '../../assets/currency.json';
import quantitysJson from '../../assets/quantity.json';
import timezonesJson from '../../assets/timezone.json';
import { styles } from '../styles';
import { imgs } from '../general/images';
import CustomHeaderBar from '../components/HeaderBar';
import { quantitySelectionHandler } from '../store/actions';
import AppContext from '../store/appContext';


const QuantitySelectionView = ({navigation, route}) => {
  const appCtx = useContext(AppContext);
  const {state, setScrollOffsetY, scrollOffsetY} = appCtx;
  const scrollViewRef = useRef(null);
  const scrollPosition = useRef(scrollOffsetY || 0);
  const {measure} = state.quantJson.units;

  const styleHandler = (quant) => {
    if (quant === measure) return styles.textSelected;
    else return styles.text;
  };

  const selectionHandler = (quant_json, unit_id) => {
    if (measure !== quant_json.units.measure)
      quantitySelectionHandler(appCtx, quant_json, unit_id);
    setScrollOffsetY(scrollPosition.current);
    navigation.navigate('Main');
  };

  const toTop = () => scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
  
  return (
    <>
      <CustomHeaderBar
        navigation={navigation}
        title={'Measurements'}
        toTop={toTop}
      />
      <View style={styles.container}>
        <ScrollView
          contentOffset={{y: scrollPosition.current}}
          ref={scrollViewRef}
          onScroll={e =>
            (scrollPosition.current = e.nativeEvent.contentOffset.y)
          }>
          <View style={[styles.headerWithIcon, {marginTop: 10}]}>
            <Image style={styles.measureIcon} source={imgs.molIcon} />
            <Text style={styles.header1}>{'Chemistry'}</Text>
          </View>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.density, 'kgpcm')}>
            <Text style={styleHandler('Density')}>Density</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.dynviscosity, 'pas')}>
            <Text style={styleHandler('Dynamic viscosity')}>
              Dynamic viscosity
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.kviscosity, 'smps')}>
            <Text style={styleHandler('Kinematic viscosity')}>
              Kinematic viscosity
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.molar, 'hydrogen')}>
            <Text style={styleHandler('Molar Mass')}>Molar Mass</Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.comIcon} />
            <Text style={styles.header1}>{'Computing'}</Text>
          </View>
          <TouchableOpacity
            style={styles.unit}
            onPress={() =>
              selectionHandler(quantitysJson.bandwidth, 'mbitpsec')
            }>
            <Text style={styleHandler('Bandwidth')}>Bandwidth</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.data, 'kilobit')}>
            <Text style={styleHandler('Data storage')}>Data storage</Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.dimIcon} />
            <Text style={styles.header1}>{'Dimension'}</Text>
          </View>
          <TouchableOpacity
            style={styles.unit}
            onPress={() =>
              selectionHandler(quantitysJson.area, 'square_meter')
            }>
            <Text style={styleHandler('Area')}>Area</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.length, 'MET')}>
            <Text style={styleHandler('Length')}>Length</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.vol, 'litre')}>
            <Text style={styleHandler('Volume')}>Volume</Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.elecIcon} />
            <Text style={styles.header1}>{'Electricity'}</Text>
          </View>
          <TouchableOpacity
            style={styles.unit}
            onPress={() =>
              selectionHandler(quantitysJson.capacitance, 'farad')
            }>
            <Text style={styleHandler('Capacitance')}>Capacitance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.echarge, 'coulomb')}>
            <Text style={styleHandler('Electric charge')}>Electric charge</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.ecurrent, 'ampere')}>
            <Text style={styleHandler('Electric current')}>
              Electric current
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.epotential, 'volt')}>
            <Text style={styleHandler('Electric potential')}>
              Electric potential
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() =>
              selectionHandler(quantitysJson.econductance, 'siemens')
            }>
            <Text style={styleHandler('Electrical conductance')}>
              Electrical conductance
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.eresistance, 'ohm')}>
            <Text style={styleHandler('Electrical resistance')}>
              Electrical resistance
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.inductance, 'henry')}>
            <Text style={styleHandler('Inductance')}>Inductance</Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.energyIcon} />
            <Text style={styles.header1}>{'Energy'}</Text>
          </View>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.energy, 'joule')}>
            <Text style={styleHandler('Energy')}>Energy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.power, 'horsepower')}>
            <Text style={styleHandler('Power')}>Power</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.temp, 'celsius')}>
            <Text style={styleHandler('Temperature')}>Temperature</Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.flowIcon} />
            <Text style={styles.header1}>{'Flow rate'}</Text>
          </View>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.mflow, 'kgpsec')}>
            <Text style={styleHandler('Mass flow rate')}>Mass flow rate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.volflow, 'cmpsec')}>
            <Text style={styleHandler('Volumetric flow rate')}>
              Volumetric flow rate
            </Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.magIcon} />
            <Text style={styles.header1}>{'Magnetism'}</Text>
          </View>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.mfield, 'tesla')}>
            <Text style={styleHandler('Magnetic field')}>Magnetic field</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.mflux, 'weber')}>
            <Text style={styleHandler('Magnetic flux')}>Magnetic flux</Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.mechIcon} />
            <Text style={styles.header1}>{'Mechanics'}</Text>
          </View>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.force, 'newton')}>
            <Text style={styleHandler('Force')}>Force</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.mass, 'KG')}>
            <Text style={styleHandler('Mass')}>Mass</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.torque, 'newmet')}>
            <Text style={styleHandler('Torque')}>Torque</Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.motionIcon} />
            <Text style={styles.header1}>{'Motion'}</Text>
          </View>
          <TouchableOpacity
            style={styles.unit}
            onPress={() =>
              selectionHandler(quantitysJson.acceleration, 'mpss')
            }>
            <Text style={styleHandler('Acceleration')}>Acceleration</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.speed, 'MPS')}>
            <Text style={styleHandler('Speed')}>Speed</Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.radIcon} />
            <Text style={styles.header1}>{'Radioactivity'}</Text>
          </View>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.rdose, 'gray')}>
            <Text style={styleHandler('Radiation')}>Radiation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() =>
              selectionHandler(quantitysJson.radiodecay, 'becque')
            }>
            <Text style={styleHandler('Radioactive decay')}>
              Radioactive decay
            </Text>
          </TouchableOpacity>

          <View style={styles.headerWithIcon}>
            <Image style={styles.measureIcon} source={imgs.timeIcon} />
            <Text style={styles.header1}>{'Time'}</Text>
          </View>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.time, 'second')}>
            <Text style={styleHandler('Time')}>Time</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(timezonesJson, null)}>
            <Text style={styleHandler('Time zones')}>Time zones</Text>
          </TouchableOpacity>

          <Text style={styles.header}>{'Other'}</Text>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.angle, 'rotation')}>
            <Text style={styleHandler('Angle')}>Angle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(currenciesJson, 'EUR')}>
            <Text style={styleHandler('Currency')}>Currency</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.freq, 'hertz')}>
            <Text style={styleHandler('Frequency')}>Frequency</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.numerals, 'dec')}>
            <Text style={styleHandler('Numerals')}>Numerals</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.pressure, 'pascal')}>
            <Text style={styleHandler('Pressure')}>Pressure</Text>
          </TouchableOpacity>
          <TouchableOpacity
            id="JOO"
            style={styles.unit}
            onPress={() => selectionHandler(quantitysJson.illuminance, 'lux')}>
            <Text style={styleHandler('Illuminance')}>Illuminance</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
}


export default QuantitySelectionView;