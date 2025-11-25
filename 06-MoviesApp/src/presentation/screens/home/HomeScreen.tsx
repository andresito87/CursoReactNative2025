import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMovies } from '../../hooks/useMovies';
import { PosterCarousel } from '../../components/movies/PosterCarousel';

export const HomeScreen = () => {

    const { isLoading, nowPlaying } = useMovies()

    if (isLoading) {
        return (<Text>Cargando ...</Text>)
    }

    return (
        <ScrollView>
            <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
                <View style={{ marginTop: 20, paddingBottom: 30 }}>
                    <PosterCarousel
                        movies={nowPlaying}
                    />
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};
