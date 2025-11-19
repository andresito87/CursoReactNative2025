import React from 'react'
import { SafeAreaView } from 'react-native'
// import { CounterScreen } from './src/presentation/screens/CounterScreen'
// import { HelloWorldScreen } from './src/presentation/screens/HelloWorldScreen'
import { CounterM3Screen } from './src/presentation/screens/CounterM3Screen'
import { PaperProvider } from 'react-native-paper'
import IonIcon from '@react-native-vector-icons/ionicons';

export const App = () => {
  return (
    <PaperProvider settings={{
      icon: (props) => <IonIcon {...props} />
    }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <HelloWorldScreen name='Andrés Podadera' /> */}
        {/* <CounterScreen /> */}
        <CounterM3Screen />
      </SafeAreaView>
    </PaperProvider>
  )
}