import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getOneMovie: build.query<
      DETAIL.GetOneMovieResponse,
      DETAIL.GetOneMovieRequest
    >({
      query: (query) => ({
        url: `/movie/${query}`,
        method: "GET",
      }),
      providesTags: ["detail"],
    }),
    getOneTvShow: build.query<
      DETAIL.GetOneTVShowResponse,
      DETAIL.GetOneTVShowRequest
    >({
      query: (query) => ({
        url: `/tv/${query}`,
        method: "GET",
      }),
      providesTags: ["detail"],
    }),
    getTvCredits: build.query<
      DETAIL.GetTVShowCreditsResponse,
      DETAIL.GetTVShowCreditsRequest
    >({
      query: (query) => ({
        url: `/tv/${query}/credits`,
        method: "GET",
      }),
      providesTags: ["detail"],
    }),
    getMovieCredits: build.query<
      DETAIL.GetMovieCreditsResponse,
      DETAIL.GetMovieCreditsRequest
    >({
      query: (query) => ({
        url: `/movie/${query}/credits`,
        method: "GET",
      }),
      providesTags: ["detail"],
    }),
    getMovieVideos: build.query<
      DETAIL.GetVideosResponse,
      DETAIL.GetVideosRequest
    >({
      query: (id) => ({
        url: `/movie/${id}/videos`,
        method: "GET",
      }),
      providesTags: ["detail"],
    }),
    getTVShowVideos: build.query<
      DETAIL.GetVideosResponse,
      DETAIL.GetVideosRequest
    >({
      query: (id) => ({
        url: `/tv/${id}/videos`,
        method: "GET",
      }),
      providesTags: ["detail"],
    }),
  }),
});

export const {
  useGetOneMovieQuery,
  useGetOneTvShowQuery,
  useGetMovieCreditsQuery,
  useGetTvCreditsQuery,
  useGetMovieVideosQuery,
  useGetTVShowVideosQuery,
} = api;
