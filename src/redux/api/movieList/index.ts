import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getMovieList: build.query<
      MOVIELIST.GetMovieListResponse,
      MOVIELIST.GetMovieListRequest
    >({
      query: ({ activePage, with_genres, sort }) => ({
        url: "/discover/movie",
        method: "GET",
        params: {
          page: activePage,
          with_genres: with_genres,
          sort_by: sort,
        },
      }),
      providesTags: ["movieList"],
    }),
  }),
});

export const { useGetMovieListQuery } = api;
