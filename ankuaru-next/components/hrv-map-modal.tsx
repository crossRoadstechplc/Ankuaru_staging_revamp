"use client";

import { useEffect } from "react";

export function HrvMapModal() {
  useEffect(() => {
    let mounted = true;
    const bootMapLibrary = async () => {
      const win = window as unknown as { L?: unknown };
      if (win.L) return;
      const leafletMod = await import("leaflet");
      if (!mounted) return;
      // Legacy script uses global `L` directly (non-module script).
      const leaflet = (leafletMod as { default?: unknown }).default ?? leafletMod;
      win.L = leaflet;
    };

    void bootMapLibrary();

    return () => {
      mounted = false;
    };
  }, []);

  return null;
}
