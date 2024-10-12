namespace MOVIELIST {
  type GetMovieListResponse = IMovieList;
  type GetMovieListRequest = {
    activePage: number;
    with_genres: string;
    sort: string;
  };
}
