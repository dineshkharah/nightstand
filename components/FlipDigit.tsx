"use client";

import { useEffect, useState } from "react";

type FlipDigitProps = {
  value: string;
};

export default function FlipDigit({ value }: FlipDigitProps) {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState(value);
  const [flipKey, setFlipKey] = useState(0);

  useEffect(() => {
    if (value !== current) {
      setPrevious(current);
      setCurrent(value);
      setFlipKey((key) => key + 1);
    }
  }, [value, current]);

  const animating = flipKey > 0;

  return (
    <div className="flip-card relative h-32 w-24 overflow-hidden rounded-xl text-7xl font-bold tabular-nums text-neutral-100 shadow-xl sm:h-44 sm:w-32 sm:text-8xl">
      <div className="flip-panel top">
        <span>{current}</span>
      </div>
      <div className="flip-panel bottom">
        <span>{previous}</span>
      </div>
      <div
        key={`top-${flipKey}`}
        className={`flip-panel flip-flap top${animating ? " animate" : ""}`}
      >
        <span>{previous}</span>
      </div>
      <div
        key={`bottom-${flipKey}`}
        className={`flip-panel flip-flap bottom${animating ? " animate" : ""}`}
      >
        <span>{current}</span>
      </div>
    </div>
  );
}
