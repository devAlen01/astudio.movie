"use client";

import { useState } from "react";
import scss from "./TopRated.module.scss";
import { useGetTopRatedQuery } from "@/redux/api/topRated";
import { useKeenSlider } from "keen-slider/react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useHeaderStore } from "@/stores/useHeaderStore";
import CircularRating from "@/ui/CircularRating/CircularRating";
import Genre from "@/ui/Genre/Genre";
import Image from "next/image";
import Sceleton from "@/ui/Sceleton/Sceleton";

const TopRated = () => {
  const [topRated, setTopRated] = useState<string>("movie");
  const { data, isLoading } = useGetTopRatedQuery(topRated);
  const router = useRouter();
  const { isMobile } = useHeaderStore();

  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: {
      perView: isMobile ? 3 : 5.1,
      spacing: 15,
    },
  });
  return (
    <section className={scss.TopRated}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.top}>
            <h1>Top rated</h1>
            <div className={scss.switcher}>
              <button
                onClick={() => setTopRated("movie")}
                className={
                  topRated === "movie"
                    ? `${scss.button} ${scss.active}`
                    : `${scss.button}`
                }
              >
                Movie
              </button>
              <button
                onClick={() => setTopRated("tv")}
                className={
                  topRated === "tv"
                    ? `${scss.button} ${scss.active}`
                    : `${scss.button}`
                }
              >
                TV
              </button>
            </div>
          </div>
          <div className={scss.bottom}>
            <div className={scss.keenSlider}>
              {!isLoading ? (
                <div ref={ref} className="keen-slider">
                  {data?.results.map((item, index) => (
                    <div key={index} className="keen-slider__slide">
                      <div
                        className={scss.slider}
                        onClick={() => router.push(`/${topRated}/${item.id}`)}
                      >
                        <Image
                          width={400}
                          height={600}
                          src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                          alt="poster"
                        />
                        <div className={scss.rating}>
                          <CircularRating rating={item.vote_average} />
                        </div>
                        <div className={scss.genre}>
                          <Genre
                            id={item.genre_ids}
                            type={topRated === "movie" ? "movie" : "tv"}
                          />
                        </div>
                        <h4 className={scss.title}>
                          {item.original_title || item.name}
                        </h4>
                        <span className={scss.date}>
                          {dayjs(
                            item?.release_date || item?.first_air_date
                          ).format("MMM D, YYYY")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    marginTop: "15px",
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px 0",
                  }}
                >
                  <Sceleton />
                  <Sceleton />
                  <Sceleton />
                  <Sceleton />
                  <Sceleton />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopRated;
