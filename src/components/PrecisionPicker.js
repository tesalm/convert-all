import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
//import Menu, { MenuItem } from 'react-native-material-menu';
import { styles } from '../styles';


const PrecisionPicker = (props) => {
  const [value, setValue] = useState(null);
  /*const menuRef = useRef();
  const hideMenu = () => {
    menuRef.current.hide();
  };
  const showMenu = () => {
    menuRef.current.show();
  };*/

  return (
    <DropDownPicker style={{ backgroundColor: '#dcdcdc' }}
      items={[
        { label: "2 digits", value: '2' },
        { label: "3 digits", value: '3' },
        { label: "4 digits", value: '4' },
        { label: "5 digits", value: '5' },
        { label: "6 digits", value: '6' },
        { label: "7 digits", value: '7' },
        { label: "8 digits", value: '8' },
        { label: "9 digits", value: '9' }
      ]}
      placeholder="Precision"
      placeholderStyle={{ textAlign: 'center', color: '#7a7a7a' }}
      selectedLabelStyle={{ textAlign: 'center' }}
      onChangeItem={item => { setValue(item.value); props.selector(item.value); }}
      defaultValue={value}
      dropDownMaxHeight={340}
      showArrow={false}
      containerStyle={styles.precisionPicker}
      labelStyle={{ color: '#000' }}
      activeLabelStyle={{ color: '#5687bb' }}
    />

    /*<Menu style={styles.decPicker} ref={menuRef} button={<Text onPress={showMenu}>Precision</Text>}>
      <MenuItem onPress={() => {props.selector('2'); menuRef.current.hide();}}>2 digits</MenuItem>
      <MenuItem onPress={() => {props.selector('3'); menuRef.current.hide();}}>3 digits</MenuItem>
      <MenuItem onPress={() => {props.selector('4'); menuRef.current.hide();}}>4 digits</MenuItem>
    </Menu>*/

    /*<Picker mode={'dropdown'} 
    style={styles.decPicker} 
    selectedValue={props.precision}
    onValueChange={(itemValue, itemIndex) => props.selector(itemValue)}>
      <Picker.Item label='2 digits' value='2' />
      <Picker.Item label='3 digits' value='3' />
      <Picker.Item label='4 digits' value='4' />
      <Picker.Item label='5 digits' value='5' />
      <Picker.Item label='6 digits' value='6' />
      <Picker.Item label='7 digits' value='7' />
      <Picker.Item label='8 digits' value='8' />
      <Picker.Item label='9 digits' value='9' />
      <Picker.Item label='10 digits' value='10' />
  </Picker>*/
  );
};

export default PrecisionPicker;