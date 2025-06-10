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
    url: "https://i.pinimg.com/736x/47/91/98/479198d44740a0b412a87721b5aa3340.jpg",
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
  {
    id: 6,
    url: "https://i.pinimg.com/736x/05/5d/b7/055db7c98b1f4866e512516d159bce1b.jpg",
  },
  {
    id: 7,
    url: "https://i.pinimg.com/736x/cf/c7/30/cfc730c2b5898c5a0db3f6de2492b729.jpg",
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
      className="relative min-h-full min-w-[64rem] flex flex-col justify-end p-4"
      style={{
        backgroundImage: `url(${images[index].url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Only show overlay in dark mode */}
      <div className="absolute inset-0 hidden dark:block bg-black/40 z-0" />

      <button
        onClick={nextImage}
        className="relative z-10 px-6 py-2 bg-[#b39f9f] dark:bg-[#5c3b3b] hover:bg-[#a38686] dark:hover:bg-[#6a4c4c] text-white rounded-xl text-base font-semibold transition self-end"
      >
        Change Background
      </button>
    </div>
  );
};
