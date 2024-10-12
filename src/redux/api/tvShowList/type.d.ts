namespace TVSHOWLIST {
  type GetTVShowListResponse = TVShowList;
  type GetTVShowListRequest = {
    with_genres: string;
    activePage: number;
    sort: string;
  };
}
