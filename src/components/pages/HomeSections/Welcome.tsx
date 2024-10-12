"use client";
import { useEffect, useState } from "react";
import scss from "./Welcome.module.scss";
import Typed from "typed.js";
import { useGetUpcomungQuery } from "@/redux/api/upcoming";
import PreLoader from "@/ui/PreLoader/PreLoader";
import React from "react";
import { useHeaderStore } from "@/stores/useHeaderStore";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Welcome = () => {
  const { data, isLoading } = useGetUpcomungQuery();
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [searchQuery, setSeaechQuery] = useState<string>("");
  const { isMobile } = useHeaderStore();
  const router = useRouter();
  const backgroundRandomImage = () => {
    if (data?.results) {
      const randomIndex = Math.floor(Math.random() * data?.results.length);
      const backdropImage = isMobile
        ? data?.results[randomIndex]?.poster_path
        : data?.results[randomIndex]?.backdrop_path;
      setBackgroundImage(`https://image.tmdb.org/t/p/original${backdropImage}`);
    }
  };

  useEffect(() => {
    backgroundRandomImage();
  }, [data]);

  //&#xB7;

  useEffect(() => {
    const typed = new Typed(".multiple-text", {
      strings: [
        "Welcome to a world of captivating stories!",
        "Every film brings a new emotion.",
        "With A·STUDIO, your dreams come to life!",
      ],
      typeSpeed: 60,
      backSpeed: 16,
      backDelay: 1200,
      loop: true,
    });
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <div className={scss.random_background}>
        {!isLoading ? (
          <Image
            width={1014}
            height={660}
            src={backgroundImage}
            alt="bg-image"
            loading="eager"
            className={scss.bg_image}
          />
        ) : (
          <PreLoader />
        )}
      </div>
      <section className={scss.Welcome}>
        <div className="container">
          <div className={scss.content}>
            <h1>
              <span className="multiple-text"></span>
            </h1>
            <h4>
              Millions of movies, TV shows and people to discover. Explore now.
            </h4>
            <form
              className={scss.search_movie}
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery) {
                  router.push(`/search/${searchQuery}`);
                }
              }}
            >
              <input
                onChange={(e) => setSeaechQuery(e.target.value)}
                type="text"
                placeholder="Search for a movie or tv show...."
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Welcome;
