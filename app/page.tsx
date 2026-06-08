"use client";

import { useEffect, useState } from "react";
import FlipDigit from "@/components/FlipDigit";
import { getSkyColors, type SkyColors } from "@/lib/sky";

function formatTime(now: Date) {
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function formatDate(now: Date) {
  return now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

const initialSky: SkyColors = { top: "rgb(8, 10, 24)", bottom: "rgb(18, 12, 34)" };

export default function Home() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [sky, setSky] = useState<SkyColors>(initialSky);

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(formatTime(now));
      setDate(formatDate(now));
      setSky(getSkyColors(now.getHours() + now.getMinutes() / 60));
    }

    tick();
    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main
      className="ambient-bg flex flex-1 flex-col items-center justify-center gap-8"
      style={
        { "--sky-top": sky.top, "--sky-bottom": sky.bottom } as React.CSSProperties
      }
    >
      <div className="clock">
        {time.split("").map((char, index) =>
          char === ":" ? (
            <span key={index} className="clock-colon text-neutral-300/70">
              :
            </span>
          ) : (
            <FlipDigit key={index} value={char} />
          )
        )}
      </div>
      <p className="text-xs font-light uppercase tracking-[0.35em] text-white/45 sm:text-sm">
        {date}
      </p>
    </main>
  );
}
