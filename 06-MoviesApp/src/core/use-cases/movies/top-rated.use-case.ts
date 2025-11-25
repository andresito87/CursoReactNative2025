import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBMoviesResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../entities/movies.entity";


export const movieTopRatedUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {

    try {

        const nowPlaying = await fetcher.get<MovieDBMoviesResponse>('/top_rated')

        return nowPlaying.results.map(MovieMapper.fromMovieDBResultToEntity)

    } catch (error) {
        console.log(error)
        throw new Error('Error fetching movies - Top Rated')
    }

}