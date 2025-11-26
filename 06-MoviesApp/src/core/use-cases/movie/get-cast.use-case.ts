import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBCastResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { CastMapper } from "../../../infrastructure/mappers/cast.mapper";
import { Cast } from "../../entities/cast.entity";

export const getMovieCastUseCase = async (fetcher: HttpAdapter, movieId: number): Promise<Cast[]> => {

    try {

        const { cast } = await fetcher.get<MovieDBCastResponse>(`/${movieId}/credits`)

        return cast.map(CastMapper.fromMovieDBCastToEntity)

    } catch (error) {
        throw new Error(`Cannot get movie cast ${movieId}. Error: ${error}`)
    }


}