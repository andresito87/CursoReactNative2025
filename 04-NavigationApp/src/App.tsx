

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
// import { StackNavigator } from './presentation/routes/StackNavigator';
import { SideMenuNavigator } from './presentation/routes/SideMenuNavigator';

export const App = () => {

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={'dark-content'}
      />
      {/* <StackNavigator /> */}
      <SideMenuNavigator />
    </NavigationContainer>
  );
}
