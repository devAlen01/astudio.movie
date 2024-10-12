"use client";
import React, { FC } from "react";
import scss from "./YoutubeTrailerSection.module.scss";
import { useParams } from "next/navigation";
import PlayIcon from "@/ui/PlayIcon/PlayIcon";
import YoutubeVideoPlayer from "@/ui/YoutubeVideoPlayer/YoutubeVideoPlayer";
import { usePlayerStore } from "@/stores/usePlayerStore";
import {
  useGetMovieVideosQuery,
  useGetTVShowVideosQuery,
} from "@/redux/api/detail";
import Image from "next/image";

const YoutubeTrailerSection: FC = () => {
  const { movieQuery, tvQuery } = useParams();
  const { data: movie } = useGetMovieVideosQuery(+movieQuery);
  const { data: tvShow } = useGetTVShowVideosQuery(+tvQuery);
  const trailers = movie?.results ? movie.results : tvShow?.results;
  const { setVideoKey } = usePlayerStore();
  return (
    <>
      {trailers?.length ? (
        <section className={scss.YoutubeTrailerSection}>
          <div className="container">
            <h3>Official Videos</h3>
            <div className={scss.content}>
              {trailers?.map((item, index) => (
                <div
                  className={scss.trailer}
                  key={index}
                  onClick={() => setVideoKey(item.key)}
                >
                  <Image
                    width={600}
                    height={180}
                    loading="eager"
                    src={`https://img.youtube.com/vi/${item?.key}/mqdefault.jpg`}
                    alt="trailer"
                  />
                  <p>{item.name}</p>
                  <div className={scss.play_icon}>
                    <PlayIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <YoutubeVideoPlayer />
        </section>
      ) : null}
    </>
  );
};

export default YoutubeTrailerSection;
