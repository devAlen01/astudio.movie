import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getMovieRecomendations: build.query<
      RECOMENDATIONS.GetMovieResponse,
      RECOMENDATIONS.GetMovieRequest
    >({
      query: (movie_id) => ({
        url: `/movie/${movie_id}/recommendations`,
        method: "GET",
      }),
    }),
    getTVShowRecomendations: build.query<
      RECOMENDATIONS.GetTVShowResponse,
      RECOMENDATIONS.GetTVShowRequest
    >({
      query: (tv_id) => ({
        url: `/tv/${tv_id}/recommendations`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetMovieRecomendationsQuery,
  useGetTVShowRecomendationsQuery,
} = api;
