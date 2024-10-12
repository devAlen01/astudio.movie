import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getUpcomung: build.query<UPCOMING.GetResponse, UPCOMING.GetRequest>({
      query: () => ({
        url: "/movie/upcoming",
        method: "GET",
      }),
      providesTags: ["upcoming"],
    }),
  }),
});

export const { useGetUpcomungQuery } = api;
