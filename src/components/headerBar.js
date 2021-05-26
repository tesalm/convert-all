import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles';
import { imgs } from '../general/images';


const CustomHeaderBar = (props) => {

  const navigateBack = () => {
    props.navigation.navigate("Main");
  };

  return (
    <View style={styles.headerBar}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigateBack()}>
        <Image style={styles.backIcon} source={imgs.backIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toTopButton}
        onPress={() => props.toTop()}>
        <Image style={styles.totopIcon} source={imgs.totopIcon}/>
      </TouchableOpacity>
    </View>
  );
}

export default CustomHeaderBar;