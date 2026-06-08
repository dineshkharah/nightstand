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

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen().catch(() => {});
  }
}

type LockableScreenOrientation = ScreenOrientation & {
  lock: (orientation: "portrait" | "landscape") => Promise<void>;
};

async function toggleOrientation() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    }
    const orientation = screen.orientation as LockableScreenOrientation;
    const next = orientation.type.startsWith("portrait")
      ? "landscape"
      : "portrait";
    await orientation.lock(next);
  } catch {
    // orientation lock isn't supported on this device
  }
}

const initialSky: SkyColors = { top: "rgb(8, 10, 24)", bottom: "rgb(18, 12, 34)" };

export default function Home() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [sky, setSky] = useState<SkyColors>(initialSky);
  const [canRotate, setCanRotate] = useState(false);

  useEffect(() => {
    const supportsLock =
      "orientation" in screen &&
      typeof (screen.orientation as Partial<LockableScreenOrientation>).lock ===
        "function";
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setCanRotate(supportsLock && isTouch);
  }, []);

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
      onClick={toggleFullscreen}
      className="ambient-bg relative flex flex-1 flex-col items-center justify-center gap-8 select-none"
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

      {canRotate && (
        <button
          type="button"
          aria-label="Rotate screen"
          onClick={(event) => {
            event.stopPropagation();
            toggleOrientation();
          }}
          className="absolute bottom-6 right-6 rounded-full bg-white/10 p-3 text-white/55 backdrop-blur-sm transition hover:bg-white/20 hover:text-white/90"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 2v6h-6" />
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
            <path d="M3 22v-6h6" />
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          </svg>
        </button>
      )}
    </main>
  );
}
