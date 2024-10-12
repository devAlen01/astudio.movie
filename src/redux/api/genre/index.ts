import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getMovieGenres: build.query<
      GENRE.GetMovieGenresResponse,
      GENRE.GetMovieGenresRequest
    >({
      query: () => ({
        url: "genre/movie/list",
        method: "GET",
      }),
    }),
    getTVShowGenres: build.query<
      GENRE.GetTVGenresResponse,
      GENRE.GetTVGenresRequest
    >({
      query: () => ({
        url: "genre/tv/list",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMovieGenresQuery, useGetTVShowGenresQuery } = api;
