"use client";
import { FC, useState } from "react";
import scss from "./Trending.module.scss";
import { useGetTrendingQuery } from "@/redux/api/trending";
import { useKeenSlider } from "keen-slider/react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useHeaderStore } from "@/stores/useHeaderStore";
import CircularRating from "@/ui/CircularRating/CircularRating";
import Genre from "@/ui/Genre/Genre";
import Image from "next/image";
import Sceleton from "@/ui/Sceleton/Sceleton";

const Trending: FC = () => {
  const [trending, setTrendig] = useState<string>("day");
  const { data, isLoading } = useGetTrendingQuery(trending);
  const { isMobile } = useHeaderStore();
  const router = useRouter();

  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: {
      perView: isMobile ? 3 : 5.1,
      spacing: 15,
    },
  });
  return (
    <section className={scss.Trending}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.top}>
            <h1>Trending</h1>
            <div className={scss.switcher}>
              <button
                onClick={() => setTrendig("day")}
                className={
                  trending === "day"
                    ? `${scss.button} ${scss.active}`
                    : `${scss.button}`
                }
              >
                Day
              </button>
              <button
                onClick={() => setTrendig("week")}
                className={
                  trending === "week"
                    ? `${scss.button} ${scss.active}`
                    : `${scss.button}`
                }
              >
                Week
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
                        onClick={() => router.push(`/movie/${item.id}`)}
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
                          <Genre id={item.genre_ids} type={"movie"} />
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

export default Trending;
