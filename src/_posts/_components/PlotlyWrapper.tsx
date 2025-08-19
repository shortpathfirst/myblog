"use client";

import { useEffect, useRef } from "react";

export default function PlotlyWrapper({ src }: { src: string }) {
  const chartRef = useRef<HTMLDivElement>(null);

  const loadPlotly = () =>
    new Promise((resolve) => {
      // @ts-expect-error Plotly is loaded dynamically,
      if (window.Plotly) return resolve(window.Plotly);

      const script = document.createElement("script");
      script.src = "https://cdn.plot.ly/plotly-3.1.0.min.js";
      script.async = true;
      script.onload = () => {
        // @ts-expect-error Plotly is loaded dynamically
        resolve(window.Plotly);
      };
      document.body.appendChild(script);
    });

  useEffect(() => {
    let canceled = false;

    const renderChart = async () => {
      const Plotly = await loadPlotly();
      const response = await fetch(src);
      const fig = await response.json();

      if (!canceled && chartRef.current) {
        // @ts-expect-error Plotly type not known
        Plotly.newPlot(chartRef.current, fig.data, fig.layout);
      }
    };

    renderChart();

    return () => {
      canceled = true;
    };
  }, [src]);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "400px",
      }}
    />
  );
}
