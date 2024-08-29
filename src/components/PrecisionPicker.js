import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from '../styles';


const PrecisionPicker = ({selector, precision}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(prevState => !prevState);

  return (
    <DropDownPicker
      style={{backgroundColor: '#dcdcdc', borderRadius: 0}}
      open={isOpen}
      value={precision}
      setOpen={toggle}
      maxHeight={400}
      items={[
        {label: '2 digits', value: '2'},
        {label: '3 digits', value: '3'},
        {label: '4 digits', value: '4'},
        {label: '5 digits', value: '5'},
        {label: '6 digits', value: '6'},
        {label: '7 digits', value: '7'},
        {label: '8 digits', value: '8'},
        {label: '9 digits', value: '9'},
      ]}
      placeholderStyle={{textAlign: 'center', color: '#7a7a7a'}}
      selectedLabelStyle={{textAlign: 'center'}}
      onSelectItem={item => selector(item.value)}
      containerStyle={styles.precisionPicker}
      labelStyle={{color: '#000'}}
      activeLabelStyle={{color: '#5687bb'}}
    />
  );
};

export default PrecisionPicker;