import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBMoviesResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../entities/movies.entity";

interface Options {
    page?: number,
    limit?: number
}

export const moviePopularUseCase = async (fetcher: HttpAdapter, options?: Options): Promise<Movie[]> => {

    try {

        const nowPlaying = await fetcher.get<MovieDBMoviesResponse>('/popular', {
            params: {
                page: options?.page ?? 1
            }
        })

        return nowPlaying.results.map(MovieMapper.fromMovieDBResultToEntity)

    } catch (error) {
        console.log(error)
        throw new Error('Error fetching movies - Popular')
    }

}