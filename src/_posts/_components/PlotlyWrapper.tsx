"use client";

import { useEffect, useRef } from "react";

export default function PlotlyWrapper({ src }: { src: string }) {
  const chartRef = useRef<HTMLDivElement>(null);

  const loadPlotly = () =>
    new Promise<any>((resolve) => {
      // @ts-expect-error Plotly is loaded dynamically
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

    let observer: ResizeObserver | null = null;

    const renderChart = async () => {
      const Plotly = await loadPlotly();
      const response = await fetch(src);
      const fig = await response.json();

      if (canceled || !chartRef.current) return;

      const layout = {
        ...fig.layout,
        autosize: true,
        width: undefined,
        height: undefined,
      };

      Plotly.newPlot(chartRef.current, fig.data, layout, {
        responsive: true,
      });

      observer = new ResizeObserver(() => {
        if (chartRef.current) {
          Plotly.Plots.resize(chartRef.current);
        }
      });

      observer.observe(chartRef.current);
    };

    renderChart();

    return () => {
      canceled = true;
      observer?.disconnect();
    };
  }, [src]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "400px",
      }}
    >
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}