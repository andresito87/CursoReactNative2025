import { StatusBar } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { CalculatorScreen } from './presentation/screens/CalculatorScreen';
import { styles } from './config/theme/app-theme';

function App() {

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.background}
      >
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'black'}
        />
        <CalculatorScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
