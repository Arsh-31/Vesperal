"use client";
import { useBackgroundStore } from "../lib/backgroundStore";

export const DefaultBackground = () => {
  const { backgroundUrl } = useBackgroundStore();

  return (
    <div
      className="absolute inset-0 -z-10"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};
