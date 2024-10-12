import React from "react";
import Popular from "./HomeSections/Popular";
import TopRated from "./HomeSections/TopRated";
import Trending from "./HomeSections/Trending";
import Welcome from "./HomeSections/Welcome";

const HomePage = () => {
  return (
    <>
      <Welcome />
      <Trending />
      <Popular />
      <TopRated />
    </>
  );
};

export default HomePage;
