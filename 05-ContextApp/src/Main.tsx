import React from 'react'
import { StatusBar, Text, useColorScheme } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export const Main = () => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaProvider>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
            <SafeAreaView>
                <Text>Hola Mundo</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}