"use client";
import { FC, useEffect, useState } from "react";
import scss from "./ItemDetail.module.scss";
import { useParams } from "next/navigation";
import PreLoader from "@/ui/PreLoader/PreLoader";
import {
  useGetMovieCreditsQuery,
  useGetMovieVideosQuery,
  useGetOneMovieQuery,
  useGetOneTvShowQuery,
  useGetTvCreditsQuery,
  useGetTVShowVideosQuery,
} from "@/redux/api/detail";
import CircularRating from "@/ui/CircularRating/CircularRating";
import dayjs from "dayjs";
import React from "react";
import PlayIcon from "@/ui/PlayIcon/PlayIcon";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { IoHeartCircleOutline } from "react-icons/io5";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface IContent {
  name: string;
  poster: string;
  movieID: number;
  releaseDate: string;
  userID?: number;
  voteAverage: number;
}

const ItemDetail: FC = () => {
  const { data: session } = useSession();
  const { movieQuery, tvQuery } = useParams();
  const mediaType = movieQuery ? "movie" : "tv";
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUser[]>([]);
  const [favorites, setFavorites] = useState<IContent[]>([]);
  const userId = user?.filter((user) => user?.email === session?.user?.email);
  const getMe = async () => {
    try {
      const { data } = await axios.get("/api/me");
      setUser(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const getFavoritesList = async () => {
    try {
      const { data } = await axios("/api/favorites");
      setFavorites(data);
    } catch (error: any) {
      console.error("Favorites Error", error.message);
    }
  };

  const addToFavorites = async (data: IContent) => {
    setLoading(true);
    try {
      const newContent = {
        mediaType: String(mediaType),
        movieID: data.movieID,
        name: data.name,
        poster: data.poster,
        releaseDate: data.releaseDate,
        voteAverage: data.voteAverage,
        userID: userId[0].id,
      };
      await axios.post("/api/favorites", newContent);
      getFavoritesList();
      getMe();
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const { data: movie } = useGetOneMovieQuery(+movieQuery);
  const { data: tv } = useGetOneTvShowQuery(+tvQuery);
  const { data: movieCredits } = useGetMovieCreditsQuery(+movieQuery);
  const { data: tvCredits } = useGetTvCreditsQuery(+tvQuery);
  const { data: movieTrailer } = useGetMovieVideosQuery(+movieQuery);
  const { data: tvShowTrailer } = useGetTVShowVideosQuery(+tvQuery);
  const trailers = movieTrailer?.results
    ? movieTrailer.results
    : tvShowTrailer?.results;
  const { setVideoKey } = usePlayerStore();
  const contentRuntime = (runtime: number) => {
    const h = Math.floor(runtime! / 60);
    const m = Math.floor(runtime! % 60);
    return `${runtime < 60 ? "" : `${h}h`} ${runtime < 1 ? `--||--` : `${m}m`}`;
  };
  // DIRECTOR
  const directorMovie = movieCredits?.crew.filter(
    (item: { job: string }) => item.job === "Director"
  );
  const directorTV = tvCredits?.crew.filter(
    (item: { job: string }) => item.job === "Director"
  );
  // WRITER
  const job = ["Writer", "Director", "Producer"];
  const writerMovie = movieCredits?.crew?.filter((item: { job: string }) =>
    job.includes(item.job)
  );
  const writerTV = tvCredits?.crew?.filter((item: { job: string }) =>
    job.includes(item.job)
  );
  // GENRES
  const genres = movie?.genres ? movie.genres : tv?.genres;

  const findContent = favorites.find(
    (el) =>
      (el.movieID === movie?.id && el?.userID === userId[0]?.id) ||
      (el.movieID === tv?.id && el?.userID === userId[0]?.id)
  );

  useEffect(() => {
    getMe();
    getFavoritesList();
  }, []);
  return (
    <>
      {movie || tv ? (
        <section className={scss.ItemDetail}>
          <Image
            width={1400}
            height={1000}
            className={scss.bgImage}
            loading="eager"
            src={`https://image.tmdb.org/t/p/original${
              movie?.backdrop_path || tv?.backdrop_path
            }`}
            alt="poster"
          />
          <div className="container">
            <div className={scss.content}>
              <div className={scss.poster}>
                {movie?.poster_path || tv?.poster_path ? (
                  <Image
                    width={600}
                    height={520}
                    loading="eager"
                    src={`https://image.tmdb.org/t/p/w500${
                      movie?.poster_path || tv?.poster_path
                    }`}
                    alt="poster"
                  />
                ) : (
                  ""
                )}
              </div>
              <div className={scss.content_info}>
                <div className={scss.title}>
                  <h3>
                    {movie?.title || tv?.name}{" "}
                    {`(${
                      movie?.release_date.slice(0, 4) ||
                      tv?.first_air_date.slice(0, 4)
                    })`}
                  </h3>
                  <i className={scss.tagline}>
                    {movie?.tagline || tv?.tagline}
                  </i>
                </div>
                <div className={scss.genres}>
                  {genres?.map((genre) => (
                    <span key={genre.id} className={scss.genre}>
                      {genre.name}
                    </span>
                  ))}
                </div>
                <div className={scss.rating_play}>
                  <div className={scss.rating}>
                    <CircularRating
                      rating={movie?.vote_average! || tv?.vote_average || 0}
                    />
                  </div>
                  <div
                    className={scss.play_icon}
                    onClick={() => setVideoKey(trailers![0]?.key)}
                  >
                    <PlayIcon />
                  </div>
                  {/*  */}
                  {session?.user && (
                    <div
                      style={{
                        color: findContent ? "red" : "",
                      }}
                      className={scss.heart_icon}
                      onClick={() => {
                        if (!findContent) {
                          addToFavorites({
                            movieID: movie?.id! || tv?.id!,
                            name: movie?.title! || tv?.name!,
                            poster: movie?.poster_path! || tv?.poster_path!,
                            releaseDate:
                              movie?.release_date! || tv?.first_air_date!,
                            voteAverage:
                              movie?.vote_average! || tv?.vote_average!,
                          });
                        }
                      }}
                    >
                      <IoHeartCircleOutline
                        style={{
                          color: loading ? "orange" : "",
                        }}
                      />
                    </div>
                  )}
                  {/*  */}
                </div>
                <h5 className={scss.overview}>Overview</h5>
                <p className={scss.desc}>{movie?.overview || tv?.overview}</p>

                <div className={scss.status_date_runtime}>
                  <p className={scss.status}>
                    Status: <span> {movie?.status || tv?.status}</span>
                  </p>
                  <p className={scss.date}>
                    Release Date:
                    <span>
                      <span></span>
                      {dayjs(movie?.release_date || tv?.first_air_date).format(
                        "MMM D, YYYY"
                      ) || "Soon"}
                    </span>
                  </p>
                  <p className={scss.runtime}>
                    Runtime:
                    <span>
                      {contentRuntime(
                        movie?.runtime! || tv?.episode_run_time[0] || 0
                      )}
                    </span>
                  </p>
                </div>
                <div className={scss.line}></div>
                {directorMovie!?.length > 0 ? (
                  <>
                    <div className={scss.director}>
                      <p>
                        Director:
                        {directorMovie?.map((d) => (
                          <span key={d.id}>{d.name}</span>
                        ))}
                      </p>
                    </div>
                    <div className={scss.line}></div>
                  </>
                ) : (
                  ""
                )}

                {directorTV!?.length > 0 ? (
                  <>
                    <div className={scss.director}>
                      <p>
                        Director:
                        {directorTV?.map((d) => (
                          <span key={d.id}>{d.name}</span>
                        ))}
                      </p>
                    </div>
                    <div className={scss.line}></div>
                  </>
                ) : (
                  ""
                )}

                {tv?.created_by!?.length > 0 ? (
                  <>
                    <div className={scss.director}>
                      <p>
                        Creator:
                        {tv?.created_by?.map((d, index) => (
                          <span key={index}>
                            {d.name}
                            {tv?.created_by!?.length > 1 ? ", " : null}
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className={scss.line}></div>
                  </>
                ) : null}

                {writerMovie!?.length > 0 && (
                  <>
                    <div className={scss.writer}>
                      <p>
                        Writter: <span></span>
                        {writerMovie
                          ?.slice(0, 4)
                          ?.map(
                            (
                              item: { id: number; name: string },
                              index: any
                            ) => (
                              <span key={item.id || index}>
                                {item.name}
                                {writerMovie.length > 1 ? ", " : null}
                              </span>
                            )
                          )}
                      </p>
                    </div>
                    <div className={scss.line}></div>
                  </>
                )}

                {writerTV!?.length > 0 && (
                  <>
                    <div className={scss.writer}>
                      <p>
                        Writter: <span></span>
                        {writerTV
                          ?.slice(0, 4)
                          ?.map(
                            (
                              item: { id: number; name: string },
                              index: any
                            ) => (
                              <span key={item.id || index}>
                                {item.name}
                                {writerTV.length > 1 ? ", " : null}
                              </span>
                            )
                          )}
                      </p>
                    </div>
                    <div className={scss.line}></div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <PreLoader />
      )}
    </>
  );
};

export default ItemDetail;
