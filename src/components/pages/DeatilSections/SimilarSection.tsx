"use client";

import React, { FC } from "react";
import scss from "./SimilarSection.module.scss";
import { useParams, useRouter } from "next/navigation";
import {
  useGetSimilarMovieQuery,
  useGetSimilarTVQuery,
} from "@/redux/api/similar";
import ItemCard from "@/ui/ItemCard/ItemCard";

const SimilarSection: FC = () => {
  const { movieQuery, tvQuery } = useParams();
  const { data: movie } = useGetSimilarMovieQuery(+movieQuery);
  const { data: tvshow } = useGetSimilarTVQuery(+tvQuery);
  const router = useRouter();
  const similar = tvshow?.results ? tvshow.results : movie?.results;
  return (
    <>
      {movie?.results.length || tvshow?.results ? (
        <section className={scss.SimilarSection}>
          <div className="container">
            {movie ? <h3>Similar Movies</h3> : <h3>Similar TV Shows</h3>}
            <div className={scss.content}>
              {similar?.map((item) => (
                <div
                  key={item.id}
                  className={scss.items}
                  onClick={() => router.push(`${item.id}`)}
                >
                  <div className={scss.card}>
                    <ItemCard
                      poster_path={item.poster_path}
                      original_title={item.title || item.name}
                      release_date={item.release_date || item.first_air_date}
                      vote_average={item.vote_average}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default SimilarSection;
