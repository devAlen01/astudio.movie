"use client";

import React, { FC } from "react";
import scss from "./SearchResult.module.scss";
import { useGetSearchResultQuery } from "@/redux/api/search";
import { useParams, useRouter } from "next/navigation";
import ItemCard from "@/ui/ItemCard/ItemCard";

const SearchResult: FC = () => {
  const { searchQuery } = useParams();
  const router = useRouter();
  const { data } = useGetSearchResultQuery(`${searchQuery}`);
  return (
    <section className={scss.SearchResult}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.explore}>
            <h2></h2>
          </div>
          <div className={scss.list}>
            {data?.results.map((item) => (
              <div
                key={item.id}
                className={scss.movie}
                onClick={() => router.push(`/${item.media_type}/${item.id}`)}
              >
                <ItemCard
                  original_title={item.title}
                  name={item.name}
                  poster_path={item.poster_path}
                  vote_average={item.vote_average}
                  release_date={item.release_date}
                  first_air_date={item.first_air_date}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
