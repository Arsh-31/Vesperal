"use client";

import { useRef, useState } from "react";

const sounds = [
  {
    name: "Rain",
    src: "https://freesound.org/data/previews/415/415209_5121236-lq.mp3",
  },
  {
    name: "Waterfall",
    src: "https://freesound.org/data/previews/235/235559_4486188-lq.mp3",
  },
  {
    name: "Fire",
    src: "https://freesound.org/data/previews/273/273792_5121236-lq.mp3",
  },
];

export const Sounds = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  const handlePlay = (trackName: string, trackSrc: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrack === trackName) {
      audio.pause();
      setCurrentTrack(null);
    } else {
      audio.src = trackSrc;
      audio.play().catch((e) => console.error("Playback failed:", e));
      setCurrentTrack(trackName);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-[#fef6f6] dark:bg-[#2b2222] p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center space-y-6 text-center">
        <h2 className="text-xl font-bold text-[#6b4c4c] dark:text-[#f4d6d6] uppercase tracking-wider">
          Ambient Sounds
        </h2>

        <div className="flex flex-col gap-3 w-full">
          {sounds.map((sound) => (
            <button
              key={sound.name}
              onClick={() => handlePlay(sound.name, sound.src)}
              className={`w-full px-5 py-2.5 rounded-xl text-base font-semibold transition ${
                currentTrack === sound.name
                  ? "bg-[#b39f9f] text-white hover:bg-[#a38686]"
                  : "bg-[#e7c6c6] hover:bg-[#ddbbbb] dark:bg-[#553838] dark:hover:bg-[#664444] text-[#7e4a4a] dark:text-[#d9bcbc]"
              }`}
            >
              {currentTrack === sound.name
                ? `Pause ${sound.name}`
                : `Play ${sound.name}`}
            </button>
          ))}
        </div>

        <audio ref={audioRef} loop />
      </div>
    </div>
  );
};
