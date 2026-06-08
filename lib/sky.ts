type Rgb = {
  r: number;
  g: number;
  b: number;
};

type SkyStop = {
  hour: number;
  top: Rgb;
  bottom: Rgb;
};

export type SkyColors = {
  top: string;
  bottom: string;
};

function rgb(r: number, g: number, b: number): Rgb {
  return { r, g, b };
}

const stops: SkyStop[] = [
  { hour: 0, top: rgb(8, 10, 24), bottom: rgb(18, 12, 34) },
  { hour: 6, top: rgb(34, 40, 70), bottom: rgb(96, 64, 58) },
  { hour: 9, top: rgb(38, 62, 92), bottom: rgb(54, 80, 104) },
  { hour: 12, top: rgb(36, 64, 96), bottom: rgb(50, 84, 116) },
  { hour: 17, top: rgb(48, 56, 86), bottom: rgb(82, 70, 60) },
  { hour: 19, top: rgb(40, 32, 62), bottom: rgb(96, 56, 44) },
  { hour: 21, top: rgb(16, 16, 36), bottom: rgb(26, 18, 42) },
  { hour: 24, top: rgb(8, 10, 24), bottom: rgb(18, 12, 34) },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpRgb(a: Rgb, b: Rgb, t: number): Rgb {
  return {
    r: lerp(a.r, b.r, t),
    g: lerp(a.g, b.g, t),
    b: lerp(a.b, b.b, t),
  };
}

function toCss({ r, g, b }: Rgb) {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

export function getSkyColors(hour: number): SkyColors {
  for (let i = 0; i < stops.length - 1; i++) {
    const start = stops[i];
    const end = stops[i + 1];

    if (hour >= start.hour && hour <= end.hour) {
      const t = (hour - start.hour) / (end.hour - start.hour);
      return {
        top: toCss(lerpRgb(start.top, end.top, t)),
        bottom: toCss(lerpRgb(start.bottom, end.bottom, t)),
      };
    }
  }

  return { top: toCss(stops[0].top), bottom: toCss(stops[0].bottom) };
}
