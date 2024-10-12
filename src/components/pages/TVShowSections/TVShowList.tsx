"use client";

import React, { FC, useEffect, useState } from "react";
import scss from "./TVShowList.module.scss";
import { useGetTVShowListQuery } from "@/redux/api/tvShowList";
import ItemCard from "@/ui/ItemCard/ItemCard";
import { useRouter } from "next/navigation";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useGetTVShowGenresQuery } from "@/redux/api/genre";
import Sceleton from "@/ui/Sceleton/Sceleton";
import { sortOptions } from "@/constants/sortBy";

const TVShowList: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [result, setResult] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([" "]);
  const [sortBy, setSortBy] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: tvGen } = useGetTVShowGenresQuery();
  const { data, status } = useGetTVShowListQuery({
    with_genres: genres.join(","),
    activePage: currentPage,
    sort: sortBy,
  });
  const router = useRouter();

  const animatedComponents = makeAnimated();
  const options = tvGen?.genres.map((gen) => ({
    value: gen.id,
    label: gen.name,
  }));

  const selectGenres = (gen: any) => {
    if (gen) {
      setGenres(gen?.map((el: any) => el?.value));
    } else {
      setGenres([]);
    }
  };
  const sortContent = (value: any) => {
    if (value) {
      setSortBy(value.value);
    } else {
      setSortBy("");
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setResult([]);
  }, [genres, sortBy]);

  useEffect(() => {
    if (data?.results) {
      setResult((prevResults) => [...prevResults, ...data.results]);
    }
  }, [data]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollY + windowHeight >= documentHeight - 600) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (status === "fulfilled") {
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    }
  }, [status]);

  return (
    <section className={scss.TVShowList}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.explore}>
            <h2>Explore TV Show</h2>
          </div>

          <div className={scss.sort}>
            <div className={scss.select}>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti={true}
                placeholder={"Select genres"}
                defaultInputValue=""
                options={options}
                onChange={selectGenres}
                styles={{}}
              />
            </div>
            <div className={scss.select}>
              <Select
                closeMenuOnSelect={true}
                defaultInputValue=""
                placeholder={"Sort by"}
                components={animatedComponents}
                options={sortOptions}
                onChange={sortContent}
              />
            </div>
          </div>
          {!isLoading ? (
            <div className={scss.list}>
              {result.map((item) => (
                <div
                  key={item.id}
                  className={scss.tvshow}
                  onClick={() => router.push(`/tv/${item.id}`)}
                >
                  <ItemCard
                    original_title={item.name}
                    poster_path={item.poster_path}
                    vote_average={item.vote_average}
                    release_date={item.first_air_date}
                  />
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
    </section>
  );
};

export default TVShowList;
