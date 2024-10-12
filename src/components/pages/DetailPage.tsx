import React from "react";
import ItemDetail from "./DeatilSections/ItemDetail";
import TopCastSection from "./DeatilSections/TopCastSection";
import YoutubeTrailerSection from "./DeatilSections/YoutubeTrailerSection";
import SimilarSection from "./DeatilSections/SimilarSection";
import Recommendations from "./DeatilSections/Recommendations";
import scss from "@/components/pages/DeatilSections/ItemDetail.module.scss";
const DetailPage = () => {
  return (
    <div className={scss.DeatilPage}>
      <ItemDetail />
      <TopCastSection />
      <YoutubeTrailerSection />
      <SimilarSection />
      <Recommendations />
    </div>
  );
};

export default DetailPage;
