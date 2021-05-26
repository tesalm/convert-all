import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';

import QuantitySelectionView from './src/components/quantityselection';
import UnitSelectionView from './src/components/unitselection';
import Main from './src/main.js';


const Tab = createBottomTabNavigator();

export default class App extends React.PureComponent {

  componentDidMount = async () => {
    // hold the splash screen a bit longer than the default behavior to avoid white screen flash.
    await new Promise((resolve) => setTimeout(resolve, 500));
    SplashScreen.hide();
  }

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen options={{tabBarVisible:false}} name="Main" component={Main}/>
          <Tab.Screen options={{tabBarVisible:false}} name="Units" component={UnitSelectionView}/>
          <Tab.Screen options={{tabBarVisible:false}} name="Quantitys" component={QuantitySelectionView}/>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
