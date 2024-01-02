"use client";

import defaultRandomImage from "~/lib/defaultImagesList";

interface ImageProps {
  image: Record<string, any> | null;
}

export const Image = ({ image }: ImageProps) => {
  if (!image) {
    const src = defaultRandomImage();
    // rendering a random default image since the API has reached its max quota
    return (
      <img
        alt="theoneliner"
        src={src}
        className="w-full object-cover h-screen absolute top-0 left-0 z-0"
      />
    );
  }
  // rendering an actual random image from the API.
  return (
    <img
      alt="theoneliner"
      src={image.urls.regular}
      className="w-full object-cover h-screen absolute top-0 left-0 z-0"
    />
  );
};
