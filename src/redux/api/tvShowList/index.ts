import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getTVShowList: build.query<
      TVSHOWLIST.GetTVShowListResponse,
      TVSHOWLIST.GetTVShowListRequest
    >({
      query: ({ activePage, with_genres, sort }) => ({
        url: "/discover/tv",
        method: "GET",
        params: {
          page: activePage,
          with_genres: with_genres,
          sort_by: sort,
        },
      }),
      providesTags: ["tvList"],
    }),
  }),
});

export const { useGetTVShowListQuery } = api;
