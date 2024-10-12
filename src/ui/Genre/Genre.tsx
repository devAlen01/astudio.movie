import React, { FC } from "react";
import scss from "./Genre.module.scss";
import {
  useGetMovieGenresQuery,
  useGetTVShowGenresQuery,
} from "@/redux/api/genre";

interface IGenreProps {
  id: number[];
  type: "movie" | "tv";
}

const Genre: FC<IGenreProps> = ({ id, type }) => {
  const { data: movie } = useGetMovieGenresQuery();
  const { data: tvshow } = useGetTVShowGenresQuery();

  let genres;
  if (type === "movie") {
    genres = movie?.genres.filter((el) => id.includes(el.id));
  } else {
    genres = tvshow?.genres.filter((el) => id.includes(el.id));
  }

  return (
    <div className={scss.Genre}>
      {genres?.slice(0, 2).map((item) => (
        <span className={scss.item} key={item.id}>
          {item.name}
        </span>
      ))}
    </div>
  );
};

export default Genre;
