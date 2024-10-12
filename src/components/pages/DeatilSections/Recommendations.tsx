"use client";

import React, { FC } from "react";
import scss from "./Recommendations.module.scss";
import { useParams, useRouter } from "next/navigation";
import {
  useGetMovieRecomendationsQuery,
  useGetTVShowRecomendationsQuery,
} from "@/redux/api/recommendations";
import ItemCard from "@/ui/ItemCard/ItemCard";

const Recommendations: FC = () => {
  const { movieQuery, tvQuery } = useParams();
  const router = useRouter();
  const { data: movie } = useGetMovieRecomendationsQuery(+movieQuery);
  const { data: tvshow } = useGetTVShowRecomendationsQuery(+tvQuery);
  const recommendations = movie?.results ? movie.results : tvshow?.results;

  return (
    <>
      {movie?.results.length || tvshow?.results ? (
        <section className={scss.Recommendations}>
          <div className="container">
            <h3>Recommendations</h3>
            <div className={scss.content}>
              {recommendations?.map((item) => (
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

export default Recommendations;
