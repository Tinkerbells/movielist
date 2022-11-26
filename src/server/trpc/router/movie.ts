import axios from 'axios'
import { PopularMovieResponse } from '../../../types/popularResponse'
import { env } from '../../../env/server.mjs'
import { router, publicProcedure } from '../trpc'

export const movieRouter = router({
    getPopularMovies: publicProcedure.query(async () => {
        const data = await axios<PopularMovieResponse>(
            'https://api.themoviedb.org/3/movie/popular',
            {
                params: { api_key: env.TMDB_API_KEY },
                headers: { 'Accept-Encoding': null },
            }
        )
        return data.data
    }),
})
