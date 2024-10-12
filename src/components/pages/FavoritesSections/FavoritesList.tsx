"use client";

import React, { FC, useEffect, useState } from "react";
import scss from "./FavoritesList.module.scss";
import axios from "axios";
import ItemCard from "@/ui/ItemCard/ItemCard";
import { useRouter } from "next/navigation";
import PreLoader from "@/ui/PreLoader/PreLoader";
import { useSession } from "next-auth/react";
interface IContent {
  name: string;
  poster: string;
  movieID: number;
  releaseDate: string;
  userID?: number;
  voteAverage: number;
  mediaType: string;
  id: number;
}
interface IUser {
  id: number;
  name: string;
  email: string;
}

const FavoritesList: FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [data, setData] = useState<IContent[]>([]);
  const [user, setUser] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();
  const getUser = async () => {
    try {
      const { data }: { data: IUser[] } = await axios("/api/me");
      setUser(data);
    } catch (error: any) {
      console.error("User Error", error.message);
    }
  };
  const getFavoritesList = async () => {
    try {
      const { data }: { data: IContent[] } = await axios("/api/favorites");
      setData(data);
    } catch (error: any) {
      console.error("Favorites Error", error.message);
      setError(error.message);
    }
  };
  const userId = user?.filter((user) => user?.email === session?.user?.email);
  const result = data?.filter((el) => el?.userID === userId[0]?.id);
  useEffect(() => {
    getUser();
    getFavoritesList();
  }, []);
  useEffect(() => {
    if (data.length > 0) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [data]);

  if (isLoading) return <PreLoader />;

  return (
    <section className={scss.FavoritesList}>
      <div className="container">
        {result.length ? (
          <div className={scss.content}>
            <div className={scss.favorite}>
              <h2>Favorites</h2>
            </div>
            <div className={scss.list}>
              {result?.map((item) => (
                <div
                  key={item.id}
                  className={scss.movie}
                  onClick={() =>
                    router.push(`/${item.mediaType}/${item.movieID}`)
                  }
                >
                  <ItemCard
                    poster_path={item.poster}
                    name={item.name}
                    release_date={item.releaseDate}
                    vote_average={item.voteAverage}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={scss.error}>{error}</div>
        )}
      </div>
    </section>
  );
};

export default FavoritesList;
