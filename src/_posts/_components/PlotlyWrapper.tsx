"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Plotly: any;
  }
}

export default function PlotlyWrapper({ src }: { src: string }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ensurePlotly = () =>
      new Promise<any>((resolve) => {
        if (window.Plotly) {
          resolve(window.Plotly);
        } else {
          const script = document.createElement("script");
          script.src = "https://cdn.plot.ly/plotly-3.1.0.min.js";
          script.async = true;
          script.onload = () => resolve(window.Plotly);
          document.body.appendChild(script);
        }
      });

    const load = async () => {
      const Plotly = await ensurePlotly();

      const res = await fetch(src);
      const fig = await res.json();

      Plotly.newPlot(chartRef.current, fig.data, fig.layout);
    };

    load();
  }, [src]);

  return <div ref={chartRef} style={{
        width: "100%",
        height: "400px",
      }} />;
}
