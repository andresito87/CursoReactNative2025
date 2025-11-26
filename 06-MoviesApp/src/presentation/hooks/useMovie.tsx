import { useEffect, useState } from "react"
import * as UseCases from '../../core/use-cases'
import { movieDBFetcher } from "../../config/adapters/movieDB.adapter"
import { FullMovie } from "../../core/entities/movies.entity"
import { Cast } from "../../core/entities/cast.entity"

export const useMovie = (movieId: number) => {

    const [isLoading, setIsLoading] = useState(true)
    const [movie, setMovie] = useState<FullMovie>()
    const [cast, setCast] = useState<Cast[]>()

    useEffect(() => {
        loadMovie()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieId])

    const loadMovie = async () => {

        setIsLoading(true)

        const fullMoviePromise = UseCases.getMovieByIdUseCase(movieDBFetcher, movieId)
        const castMoviePromise = UseCases.getMovieCastUseCase(movieDBFetcher, movieId)

        const [fullMovie, castMovie] = await Promise.all([
            fullMoviePromise,
            castMoviePromise
        ])

        setMovie(fullMovie)
        setCast(castMovie)

        setIsLoading(false)

        // console.log({ fullMovie })
        // console.log({ castMovie })
    }

    return {
        isLoading,
        movie,
        cast
    }
}