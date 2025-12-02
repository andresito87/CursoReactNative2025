import { StatusBar, useColorScheme } from 'react-native';
import { Navigator } from './presentation/navigator/Navigator';
import { NavigationContainer } from '@react-navigation/native';

export const ComponentsApp = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Navigator />
    </NavigationContainer>
  );
}

export default ComponentsApp;