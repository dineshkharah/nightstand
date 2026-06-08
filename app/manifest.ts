import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nightstand",
    short_name: "Nightstand",
    description: "A calm, ambient flip clock for your nightstand.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a0b14",
    theme_color: "#0a0b14",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
