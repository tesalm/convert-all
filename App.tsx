/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import BootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { AppContextProvider } from './src/store/appContext';
import Main from './src/screens/Main';
import UnitSelectionView from './src/screens/UnitSelection';
import QuantitySelectionView from './src/screens/QuantitySelection';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer onReady={() => BootSplash.hide({fade: true})}>
      <AppContextProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{headerShown: false, title: ''}}
          />
          <Stack.Screen
            name="Units"
            component={UnitSelectionView}
            options={{headerShown: false, title: ''}}
          />
          <Stack.Screen
            name="Quantitys"
            component={QuantitySelectionView}
            options={{headerShown: false, title: ''}}
          />
        </Stack.Navigator>
      </AppContextProvider>
    </NavigationContainer>
  );
}

export default App;