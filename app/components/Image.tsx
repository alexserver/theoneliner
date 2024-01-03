"use client";

import defaultRandomImage from "~/lib/defaultImagesList";

interface ImageProps {
  image: Record<string, any> | null;
}

export const Image = ({ image }: ImageProps) => {
  const img = image !== null ? image : defaultRandomImage();
  const src = img.urls?.regular;
  const author = img.user?.name;
  const link = img.links?.html;
  return (
    <div className="w-full h-screen absolute top-0 left-0 z-0">
      <img alt="theoneliner" src={src} className="w-full h-full object-cover" />
      <a
        href={link}
        target="_blank"
        className="absolute bottom-0 w-full text-sm text-right bg-slate-900/50 hover:bg-slate-900/90 text-white px-4 py-2"
      >
        Photo by {author}
      </a>
    </div>
  );
};
