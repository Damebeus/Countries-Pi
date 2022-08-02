import React from "react";
import VideoSlider from "./VideoSlider";
function SliderData() {
  const carruVideo = [
    "../videoSlider/uno.mp4",
    "../videoSlider/2.mp4",
    "../videoSlider/3.mp4",
    "../videoSlider/4.mp4",
    "../videoSlider/5.mp4",
    "../videoSlider/6.mp4",
    "../videoSlider/7.mp4",
  ];

  return <VideoSlider videos={carruVideo} />;
}

export default SliderData;
