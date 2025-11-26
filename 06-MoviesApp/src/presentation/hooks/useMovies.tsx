import { useEffect, useState } from "react"
import { Movie } from "../../core/entities/movies.entity"
import * as UseCases from '../../core/use-cases'
import { movieDBFetcher } from "../../config/adapters/movieDB.adapter"

let popularPageNumber = 1

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true)

    const [nowPlaying, setNowPlaying] = useState<Movie[]>([])
    const [upcoming, setUpcoming] = useState<Movie[]>([])
    const [topRated, setTopRated] = useState<Movie[]>([])
    const [popular, setPopular] = useState<Movie[]>([])

    useEffect(() => {
        initialLoad()
    }, [])

    const initialLoad = async () => {

        const [
            nowPlayingMovies,
            upComingMovies,
            topRatedMovies,
            popularMovies,
        ] = await Promise.all([ // throw all promises to resolve them simultaneously
            UseCases.movieNowPlayingUseCase(movieDBFetcher),
            UseCases.movieUpcomingUseCase(movieDBFetcher),
            UseCases.movieTopRatedUseCase(movieDBFetcher),
            UseCases.moviePopularUseCase(movieDBFetcher),
        ])

        setNowPlaying(nowPlayingMovies)
        setUpcoming(upComingMovies)
        setTopRated(topRatedMovies)
        setPopular(popularMovies)

        setIsLoading(false)
    }

    return {
        // Properties
        isLoading,
        nowPlaying,
        upcoming,
        topRated,
        popular,

        // Methods
        popularNextPage: async () => {
            popularPageNumber++
            const popularMovies = await UseCases.moviePopularUseCase(movieDBFetcher, {
                page: popularPageNumber
            })
            setPopular(prev => [...prev, ...popularMovies])
        }


    }
}
