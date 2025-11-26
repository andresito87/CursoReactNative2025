import React from 'react';
import {
    FlatList,
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { FullMovie } from '../../../../core/entities/movies.entity';
import { Formatter } from '../../../../config/helpers/formatter';
import { Cast } from '../../../../core/entities/cast.entity';
import { CastActor } from '../../cast/CastActor';

interface Props {
    movie: FullMovie;
    cast: Cast[];
}

const MAX_STARS = 5;

export const MovieDetails = ({ movie, cast }: Props) => {
    // Si la API devuelve rating sobre 10, lo pasamos a escala de 5
    const ratingOverFive = Math.round(movie.rating / 2);

    return (
        <>
            <View style={styles.container}>
                {/* Calificación + Géneros */}
                <View style={styles.metaContainer}>
                    {/* Calificación */}
                    <View style={styles.ratingSection}>
                        <Text style={styles.metaLabel}>Calificación</Text>

                        <View style={styles.ratingRow}>
                            <Text style={styles.ratingValue}>
                                {movie.rating.toFixed(1)}
                            </Text>
                        </View>

                        <View style={styles.starsRow}>
                            {Array.from({ length: MAX_STARS }).map((_, index) => (
                                <MaterialIcons
                                    key={index}
                                    name={index < ratingOverFive ? 'star' : 'star-border'}
                                    size={18}
                                    color="#facc15"
                                />
                            ))}
                        </View>
                    </View>

                    {/* Géneros */}
                    <View style={styles.genresSection}>
                        <Text style={styles.metaLabel}>Géneros</Text>
                        <View style={styles.genresContainer}>
                            {movie.genres.map((genre) => (
                                <View key={genre} style={styles.genreChip}>
                                    <Text style={styles.genreChipText}>{genre}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Historia */}
                <Text style={styles.sectionTitle}>Historia</Text>
                <Text style={styles.sectionText}>{movie.description}</Text>

                {/* Presupuesto */}
                <Text style={styles.sectionTitle}>Presupuesto</Text>
                <Text style={styles.sectionText}>
                    {Formatter.currency(movie.budget)}
                </Text>
            </View>

            {/* Casting */}
            <View style={styles.castContainer}>
                <Text style={[styles.sectionTitle, styles.castTitle]}>
                    Actores
                </Text>
                <FlatList
                    data={cast}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <CastActor actor={item} />}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    metaContainer: {
        marginBottom: 16,
    },
    metaLabel: {
        fontSize: 12,
        color: '#6b7280',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    ratingSection: {
        marginTop: 4,
        marginBottom: 12,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingValue: {
        marginLeft: 6,
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    starsRow: {
        flexDirection: 'row',
        marginTop: 4,
    },
    genresSection: {
        marginTop: 4,
    },
    genresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4,
    },
    genreChip: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: '#e5e7eb',
        marginRight: 8,
        marginBottom: 8,
    },
    genreChipText: {
        fontSize: 12,
        color: '#374151',
    },
    sectionTitle: {
        fontSize: 23,
        marginTop: 10,
        marginBottom: 4,
        fontWeight: 'bold',
        color: '#111827',
    },
    sectionText: {
        fontSize: 16,
        color: '#4b5563',
        lineHeight: 22,
    },
    castContainer: {
        marginTop: 10,
        marginBottom: 50,
    },
    castTitle: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
});
