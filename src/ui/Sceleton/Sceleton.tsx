import React, { FC } from "react";
import scss from "./Sceleton.module.scss";
const Sceleton: FC = () => {
  return (
    <div className={`${scss.is_loading}`}>
      <div className={scss.image}></div>
      <div className={scss.content}>
        <p></p>
      </div>
    </div>
  );
};

export default Sceleton;
