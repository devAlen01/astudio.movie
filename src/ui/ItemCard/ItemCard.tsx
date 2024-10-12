import React, { FC, useEffect, useState } from "react";
import scss from "./ItemCard.module.scss";
import CircularRating from "../CircularRating/CircularRating";
import dayjs from "dayjs";
import defPoster from "@/assets/image.png";
import Image from "next/image";
interface IItemProps {
  name?: string;
  original_title?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path?: string;
  vote_average?: number;
}

const ItemCard: FC<IItemProps> = ({
  first_air_date,
  name,
  original_title,
  poster_path,
  release_date,
  vote_average,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (poster_path) {
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }
  }, [poster_path]);

  return (
    <div className={scss.ItemCard}>
      <div className={scss.image}>
        {!poster_path ? (
          <Image
            style={{ border: "1px solid white" }}
            src={defPoster}
            width={400}
            height={700}
            loading="eager"
            alt="poster"
          />
        ) : isLoading ? (
          <div className={scss.isLoading}>
            <Image
              style={{
                opacity: "0.1",
                filter: "blur(12px)",
                transition: "0.5s",
              }}
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              width={400}
              height={700}
              loading="eager"
              alt="poster"
            />
          </div>
        ) : (
          <Image
            width={400}
            height={700}
            loading="eager"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="poster"
          />
        )}
      </div>
      <div className={scss.rating}>
        <CircularRating rating={vote_average! || 0} />
      </div>
      <div className={scss.title_date}>
        <h4 className={scss.title}>{original_title || name}</h4>
        <span className={scss.date}>
          {dayjs(release_date || first_air_date || "").format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default ItemCard;
