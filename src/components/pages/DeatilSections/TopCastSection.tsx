"use client";

import React, { FC } from "react";
import scss from "./TopCastSection.module.scss";
import {
  useGetMovieCreditsQuery,
  useGetTvCreditsQuery,
} from "@/redux/api/detail";
import { useParams } from "next/navigation";
import Image from "next/image";

const TopCastSection: FC = () => {
  const { movieQuery, tvQuery } = useParams();
  const { data: castMovie } = useGetMovieCreditsQuery(+movieQuery!);
  const { data: castTV } = useGetTvCreditsQuery(+tvQuery);
  const cast = castMovie?.cast ? castMovie.cast : castTV?.cast;
  return (
    <>
      {castMovie || castTV ? (
        <section className={scss.TopCastSection}>
          <div className="container">
            <h3>Top cast</h3>
            <div className={scss.content}>
              {cast?.length
                ? cast?.map((item, index) => (
                    <div key={item.id || index} className={scss.cast}>
                      <div className={scss.profile}>
                        <Image
                          width={100}
                          height={100}
                          src={
                            item.profile_path
                              ? `https://image.tmdb.org/t/p/original${item.profile_path}`
                              : "https://png.pngtree.com/background/20230606/original/pngtree-the-person-is-wearing-green-and-is-silhouetted-by-the-background-picture-image_2879771.jpg"
                          }
                          alt="actor"
                        />
                      </div>
                      <div className={scss.cast_name}>
                        <h5>{item.name}</h5>
                        <h6>{item.character}</h6>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default TopCastSection;
