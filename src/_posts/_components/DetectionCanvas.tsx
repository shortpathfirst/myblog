"use client";

import React, { useEffect, useRef, useState } from "react";
import sampleImage from "/public/postimages/ssdvsyolo/Paul-Deadlift-Side-View-1082x1080.webp";

type Box = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  color: string;
};


export default function DetectionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [mode, setMode] = useState<"ssd" | "yolo">("ssd");
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);

  const ssdPredictions: Box[] = [
    {
      x: 327.6,
      y: 642.0,
      width: 372.8,
      height: 395.9,
      label: "Plate 1.000",
      color: "#10b981",
    },
    {
      x: 451.9,
      y: 936.5,
      width: 55.4,
      height: 57.8,
      label: "Barbell 0.932",
      color: "#f97316",
    }
  ];

  const yoloPredictions: Box[] = [
    {
      x: 311,
      y: 629,
      width: 397,
      height: 399,
      label: "Plate 0.9078",
      color: "#2563eb",
    },
    {
      x: 453,
      y: 937,
      width: 54,
      height: 52,
      label: "Barbell 0.7158",
      color: "#db2777",
    },
  ];

  const getPredictions = () =>
    mode === "ssd" ? ssdPredictions : yoloPredictions;

  // Load image
  useEffect(() => {
    const img = new Image();
    img.src = sampleImage.src;
    img.onload = () => {
      imageRef.current = img;
      draw();
    };
  }, []);

  useEffect(() => {
    if (showPredictions) {
      setBoxes(getPredictions());
    }
  }, [mode, showPredictions]);

  useEffect(() => {
    draw();
  }, [mode, hoveredBox, boxes]);

  const draw = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    boxes.forEach((box, i) => {
      const isHovered = hoveredBox === i;
      // Draw boxes
      ctx.shadowBlur = isHovered ? 12 : 6;
      ctx.strokeStyle = box.color;
      ctx.lineWidth = isHovered ? 4 : 2;
      ctx.fillStyle = box.color + "33";

      ctx.beginPath();
      ctx.rect(box.x, box.y, box.width, box.height);
      ctx.fill();
      ctx.stroke();

      // Draw text
      ctx.shadowBlur = 0;
      ctx.font = "36px sans-serif";

      const width = ctx.measureText(box.label).width;
      const height = 38;

      ctx.fillStyle = box.color;
      ctx.fillRect(box.x, box.y - height / 2, width + 10, height);

      ctx.fillStyle = "white";
      ctx.textBaseline = "middle";
      ctx.fillText(box.label, box.x + 5, box.y);
    });
  };


  const togglePrediction = () => {
    setShowPredictions((prev) => {
      const next = !prev;
      if (next) {
        setBoxes(getPredictions());
      } else {
        setBoxes([]);
      }
      return next;
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const hovered = boxes.findIndex(
      (b) =>
        x >= b.x &&
        x <= b.x + b.width &&
        y >= b.y &&
        y <= b.y + b.height
    );

    setHoveredBox(hovered >= 0 ? hovered : null);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          padding: 16,
          background: "#fff",
        }}
      >
        {/* Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          {/* Left buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => {
                setMode("ssd");
                setShowPredictions(true);
              }}
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                border: "1px solid #d1d5db",
                background: mode === "ssd" ? "#111827" : "#f3f4f6",
                color: mode === "ssd" ? "white" : "#111827",
                cursor: "pointer",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
            >
              SSD View
            </button>

            <button
              onClick={() => {
                setMode("yolo");
                setShowPredictions(true);
              }}
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                border: "1px solid #d1d5db",
                background: mode === "yolo" ? "#111827" : "#f3f4f6",
                color: mode === "yolo" ? "white" : "#111827",
                cursor: "pointer",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
            >
              YOLO View
            </button>
          </div>

          {/* Right button */}
          <button
            onClick={togglePrediction}
            style={{
              padding: "9px 16px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg, #16a34a, #22c55e)",
              color: "white",
              fontWeight: 700,
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            {showPredictions ? "Hide Prediction" : "Show Prediction"}
          </button>
        </div>
        {/* Canvas */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "10px 0",
            background: "#f9fafb",
            borderRadius: 12,
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredBox(null)}
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "auto",
              borderRadius: 12,
              cursor: "crosshair",
              display: "block",
            }}
          />
        </div>

        {/* Explanation */}
        <div
          style={{
            fontSize: 14,
            color: "#374151",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          {mode === "ssd" ? (
            <strong>SSD: dense multi-scale anchor predictions</strong>
          ) : (
            <strong>YOLO: single-stage direct regression</strong>
          )}
        </div>
      </div>
    </div>
  );
}