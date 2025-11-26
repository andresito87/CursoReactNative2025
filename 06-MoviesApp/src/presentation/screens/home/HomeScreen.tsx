import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMovies } from '../../hooks/useMovies';
import { PosterCarousel } from '../../components/movies/PosterCarousel';
import { HorizontalCarousel } from '../../components/movies/HorizontalCarousel';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';

export const HomeScreen = () => {
    const {
        isLoading,
        nowPlaying,
        popular,
        topRated,
        upcoming,
        popularNextPage,
    } = useMovies();

    if (isLoading) {
        return <FullScreenLoader />;
    }

    return (
        <ScrollView>
            <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
                <View style={styles.contentContainer}>

                    {/* Título */}
                    <Text style={styles.appTitle}>Pelis App</Text>

                    {/* Principal */}
                    <PosterCarousel movies={nowPlaying} />

                    {/* Populares */}
                    <HorizontalCarousel
                        movies={popular}
                        title="Populares"
                        loadNextPage={popularNextPage}
                    />

                    {/* Top Rated */}
                    <HorizontalCarousel
                        movies={topRated}
                        title="Mejor Calificadas"
                    />

                    {/* Próximamente */}
                    <HorizontalCarousel
                        movies={upcoming}
                        title="Próximamente" />

                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    contentContainer: {
        marginTop: 20,
        paddingBottom: 30,
    },
    appTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginBottom: 12,
        color: '#111827',
        letterSpacing: 0.5,
        textAlign: 'center',
    },
});
