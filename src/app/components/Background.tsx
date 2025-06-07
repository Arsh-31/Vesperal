"use client";
import { useState } from "react";
import { useBackgroundStore } from "../lib/backgroundStore";

const images = [
  {
    id: 1,
    url: "https://i.pinimg.com/736x/27/3f/78/273f78590ca87b05583215dcf21ff112.jpg",
  },
  {
    id: 2,
    url: "https://i.pinimg.com/736x/15/38/e3/1538e31361003cdd0f0de2e0bb81df73.jpg",
  },
  {
    id: 3,
    url: "https://i.pinimg.com/736x/6c/dc/cb/6cdccbac812ac27056a81383d841b08d.jpg",
  },
  {
    id: 4,
    url: "https://i.pinimg.com/736x/19/bf/9f/19bf9fd156c6a9a183294ec4c5d02f6f.jpg",
  },
  {
    id: 5,
    url: "https://i.pinimg.com/736x/0f/8c/e4/0f8ce457af95c7ba437c026798c5c0cc.jpg",
  },
];

export const Background = () => {
  const { backgroundUrl, setBackgroundUrl } = useBackgroundStore();
  const [index, setIndex] = useState(
    images.findIndex((img) => img.url === backgroundUrl) || 0
  );

  const nextImage = () => {
    const nextIndex = (index + 1) % images.length;
    setIndex(nextIndex);
    setBackgroundUrl(images[nextIndex].url);
  };

  return (
    <div
      className="min-h-full min-w-[64rem] flex flex-col justify-end p-4"
      style={{
        backgroundImage: `url(${images[index].url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <button
        onClick={nextImage}
        className="px-6 py-2 bg-[#b39f9f] hover:bg-[#a38686] text-white rounded-xl text-base font-semibold transition self-end"
      >
        Change Background
      </button>
    </div>
  );
};
