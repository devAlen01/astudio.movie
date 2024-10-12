"use client";

import React, { FC } from "react";
import scss from "./YoutubeVideoPlayer.module.scss";
import ReactPlayer from "react-player";
import { SlClose } from "react-icons/sl";
import { usePlayerStore } from "@/stores/usePlayerStore";

const YoutubeVideoPlayer: FC = () => {
  const { videoKey, setVideoKey } = usePlayerStore();
  return videoKey ? (
    <div className={scss.YoutubeVideoPlayer} onClick={() => setVideoKey("")}>
      <div className={scss.close}>
        <SlClose />
      </div>
      <div className={scss.video}>
        <ReactPlayer
          width="100%"
          height="100%"
          loop
          playing
          controls
          url={`https://www.youtube.com/embed/${videoKey}`}
        />
      </div>
    </div>
  ) : null;
};

export default YoutubeVideoPlayer;
