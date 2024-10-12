import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getTrending: build.query<TRENDING.GetResponse, TRENDING.GetRequest>({
      query: (query) => ({
        url: `/trending/movie/${query}`,
        method: "GET",
      }),
      providesTags: ["trending"],
    }),
  }),
});

export const { useGetTrendingQuery } = api;
