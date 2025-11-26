import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ScrollView } from 'react-native'
import { RootStackParams } from '../../navigation/Navigation'
import { useMovie } from '../../hooks/useMovie'
import { MovieHeader } from '../../components/movies/movie/MovieHeader'
import { MovieDetails } from '../../components/movies/movie/MovieDetails'
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader'


interface Props extends StackScreenProps<RootStackParams, 'Details'> { }

export const DetailsScreen = ({ route }: Props) => {

    const { movieId } = route.params

    const { isLoading, movie, cast = [] } = useMovie(movieId)

    if (isLoading) {
        return (<FullScreenLoader />)
    }

    return (
        <ScrollView style={{ flex: 1 }}>

            {/* Header */}
            <MovieHeader
                poster={movie!.poster}
                originalTitle={movie!.originalTitle}
                title={movie!.title}
            />

            {/* Details */}
            <MovieDetails movie={movie!} cast={cast} />

        </ScrollView>
    )
}