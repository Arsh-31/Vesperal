"use client";
import { useBackgroundStore } from "../lib/backgroundStore";

export const DefaultBackground = () => {
  const { backgroundUrl } = useBackgroundStore();

  return (
    <div className="absolute inset-0 -z-10">
      {/* Background Image */}
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 dark:bg-black/40" />
    </div>
  );
};
