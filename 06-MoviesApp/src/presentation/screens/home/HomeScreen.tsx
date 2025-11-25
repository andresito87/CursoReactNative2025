import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMovies } from '../../hooks/useMovies';

export const HomeScreen = () => {

    const { } = useMovies()

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
            <Text>Home Screen</Text>
        </SafeAreaView>
    );
};
