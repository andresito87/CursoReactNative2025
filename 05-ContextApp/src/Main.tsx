import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { TabNavigator } from './presentation/navigators/BottomTabNavigator';

export const Main = () => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <NavigationContainer>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
            <TabNavigator />
        </NavigationContainer>
    );
}