"use client";

import { useEffect } from "react";

export function HrvMapModal() {
  useEffect(() => {
    let mounted = true;
    const bootMap = async () => {
      const host = document.getElementById("hrv-map-host");
      if (!host || host.dataset.mapReady === "true") return;
      const L = await import("leaflet");
      if (!mounted) return;
      host.dataset.mapReady = "true";
      const map = L.map(host).setView([7.67, 36.83], 7);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);
      L.marker([7.67, 36.83]).addTo(map).bindPopup("Jimma Zone");
      setTimeout(() => map.invalidateSize(), 0);
    };

    bootMap();

    return () => {
      mounted = false;
    };
  }, []);

  return null;
}
