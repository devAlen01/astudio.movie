"use client";
import React, { FC, useEffect, useState } from "react";
import scss from "./MovieList.module.scss";
import { useGetMovieListQuery } from "@/redux/api/movieList";
import ItemCard from "@/ui/ItemCard/ItemCard";
import { useRouter } from "next/navigation";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useGetMovieGenresQuery } from "@/redux/api/genre";
import Sceleton from "@/ui/Sceleton/Sceleton";
import { sortOptions } from "@/constants/sortBy";

const MovieList: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [result, setResult] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([""]);
  const [sortBy, setSortBy] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data, status } = useGetMovieListQuery({
    activePage: currentPage,
    with_genres: genres?.join(","),
    sort: sortBy,
  });
  const { data: movieGen } = useGetMovieGenresQuery();
  const router = useRouter();
  const animatedComponents = makeAnimated();
  const options = movieGen?.genres.map((gen) => ({
    value: gen.id,
    label: gen.name,
  }));

  const sortContent = (value: any) => {
    if (value) {
      setSortBy(value.value);
    } else {
      setSortBy("");
    }
  };

  const selectGenres = (gen: any) => {
    if (gen) {
      setGenres(gen?.map((el: any) => el?.value));
    } else {
      setGenres([]);
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollY + windowHeight >= documentHeight - 600) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (status === "fulfilled") {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [status]);

  return (
    <section className={scss.MovieList}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.explore}>
            <h2>Explore Movies</h2>
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
              />
            </div>
            <div className={scss.select}>
              <Select
                placeholder={"Sort by"}
                components={animatedComponents}
                options={sortOptions}
                onChange={sortContent}
              />
            </div>
          </div>
          {!isLoading ? (
            <div className={scss.list}>
              {result?.map((item) => (
                <div
                  key={item.id}
                  className={scss.movie}
                  onClick={() => router.push(`/movie/${item.id}`)}
                >
                  <ItemCard
                    original_title={item.title}
                    poster_path={item.poster_path}
                    vote_average={item.vote_average}
                    release_date={item.release_date}
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

export default MovieList;
