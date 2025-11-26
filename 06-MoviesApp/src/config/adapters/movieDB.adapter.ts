import { THE_MOVIE_DB_KEY } from "@env";
import { AxiosAdapter } from "./http/axios.adapter";

export const movieDBFetcher = new AxiosAdapter({
    baseUrl: 'https://api.themoviedb.org/3/movie',
    params: {
        // api_key: 'e9c72ae299531334cf44d4d2653ca552',
        api_key: THE_MOVIE_DB_KEY ?? 'no-key',
        language: 'es'
    }
})