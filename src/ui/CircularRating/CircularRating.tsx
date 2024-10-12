"use client";
import React, { FC } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface IRatingProps {
  rating: number;
}
const CircularRating: FC<IRatingProps> = ({ rating }) => {
  const ratingColor = (rating: number): string => {
    if (rating >= 7) {
      return "rgb(43, 215, 77)";
    } else if (rating >= 4) {
      return "rgb(255, 165, 0)";
    } else {
      return "rgba(255, 0, 0, 0.787)";
    }
  };
  return (
    <>
      <CircularProgressbar
        value={+rating}
        maxValue={10}
        text={`${+rating?.toString().slice(0, 3) || "0"}`}
        styles={buildStyles({
          pathColor: `${ratingColor(+rating)}`,
          textColor: "#fff",
          trailColor: "black",
          textSize: "30px",
        })}
      />
    </>
  );
};

export default CircularRating;
