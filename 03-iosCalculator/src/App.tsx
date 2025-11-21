import { StatusBar } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { CalculatorScreen } from './presentation/screens/CalculatorScreen';

function App() {

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top', 'right', 'bottom', 'left']}
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
