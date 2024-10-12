import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getTopRated: build.query<TOPRATED.GetResponse, TOPRATED.GetRequest>({
      query: (query) => ({
        url: `/${query}/top_rated`,
        method: "GET",
      }),
      providesTags: ["topRated"],
    }),
  }),
});

export const { useGetTopRatedQuery } = api;
