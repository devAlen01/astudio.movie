import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getSimilarMovie: build.query<
      SIMILAR.GetSimilarMovieResponse,
      SIMILAR.GetSimilarMovieRequest
    >({
      query: (query) => ({
        url: `movie/${query}/similar`,
        method: "GET",
      }),
      providesTags: ["similar"],
    }),
    getSimilarTV: build.query<
      SIMILAR.GetSimilarTVResponse,
      SIMILAR.GetSimilarTVRequest
    >({
      query: (query) => ({
        url: `tv/${query}/similar`,
        method: "GET",
      }),
      providesTags: ["similar"],
    }),
  }),
});

export const { useGetSimilarMovieQuery, useGetSimilarTVQuery } = api;
