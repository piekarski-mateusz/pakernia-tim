import React from "react";

export default function YoutubePlayerWeb({ videoId, width, height, play }) {
  const autoplay = play ? 1 : 0;

  return (
    <iframe
      width={width || "100%"}
      height={height || 360}
      src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay}&playsinline=1`}
      title="YouTube player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      style={{ borderRadius: 12 }}
    />
  );
}
