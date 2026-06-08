"use client";

import { useEffect, useState } from "react";
import FlipDigit from "@/components/FlipDigit";
import { getSkyColors, type SkyColors } from "@/lib/sky";

function formatTime(now: Date) {
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

const initialSky: SkyColors = { top: "rgb(11, 16, 38)", bottom: "rgb(26, 16, 51)" };

export default function Home() {
  const [time, setTime] = useState("");
  const [sky, setSky] = useState<SkyColors>(initialSky);

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(formatTime(now));
      setSky(getSkyColors(now.getHours() + now.getMinutes() / 60));
    }

    tick();
    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main
      className="ambient-bg flex flex-1 items-center justify-center gap-2 sm:gap-3"
      style={
        { "--sky-top": sky.top, "--sky-bottom": sky.bottom } as React.CSSProperties
      }
    >
      {time.split("").map((char, index) =>
        char === ":" ? (
          <span
            key={index}
            className="text-6xl font-bold text-neutral-300/70 sm:text-7xl"
          >
            :
          </span>
        ) : (
          <FlipDigit key={index} value={char} />
        )
      )}
    </main>
  );
}
