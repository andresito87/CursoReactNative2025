import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Navigation } from './presentation/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';

export const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Navigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
