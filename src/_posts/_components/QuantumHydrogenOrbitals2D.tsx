"use client";
import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';

// ── Math helpers (ψ_nlm on the x–z plane, mirrors the reference HTML) ───────

function factorial(n: number): number {
  let v = 1;
  for (let k = 2; k <= n; k++) v *= k;
  return v;
}

// Generalised Laguerre polynomial L_p^(a)(x)
function genLaguerre(p: number, a: number, x: number): number {
  if (p === 0) return 1;
  if (p === 1) return 1 + a - x;
  let lm2 = 1;
  let lm1 = 1 + a - x;
  let l = 0;
  for (let k = 2; k <= p; k++) {
    l = ((2 * k - 1 + a - x) * lm1 - (k - 1 + a) * lm2) / k;
    lm2 = lm1;
    lm1 = l;
  }
  return l;
}

// Associated Legendre P_l^m(x) for m ≥ 0
function assocLegendre(l: number, m: number, x: number): number {
  m = Math.abs(m);
  x = Math.max(-1, Math.min(1, x));
  let pmm = 1;
  if (m) {
    const s = Math.sqrt(Math.max(0, (1 - x) * (1 + x)));
    let f = 1;
    for (let i = 1; i <= m; i++) {
      pmm *= -f * s;
      f += 2;
    }
  }
  if (l === m) return pmm;
  let pm1 = x * (2 * m + 1) * pmm;
  if (l === m + 1) return pm1;
  let pll = 0;
  for (let ll = m + 2; ll <= l; ll++) {
    pll = ((2 * ll - 1) * x * pm1 - (ll + m - 1) * pmm) / (ll - m);
    pmm = pm1;
    pm1 = pll;
  }
  return pll;
}

function radial(n: number, l: number, r: number): number {
  const rho = (2 * r) / n;
  const p = n - l - 1;
  const norm = Math.sqrt((Math.pow(2 / n, 3) * factorial(p)) / (2 * n * factorial(n + l)));
  return norm * Math.exp(-rho / 2) * Math.pow(rho, l) * genLaguerre(p, 2 * l + 1, rho);
}

// Real/imaginary parts of the complex spherical harmonic Y_l^m(θ, φ)
function ylmParts(l: number, m: number, theta: number, phi: number): [number, number] {
  const N = Math.sqrt(((2 * l + 1) / (4 * Math.PI)) * (factorial(l - m) / factorial(l + m)));
  const amp = N * assocLegendre(l, m, Math.cos(theta));
  return [amp * Math.cos(m * phi), amp * Math.sin(m * phi)];
}

// Real/imaginary parts of ψ_nlm at a Cartesian point
function psiParts(n: number, l: number, m: number, x: number, y: number, z: number): [number, number] {
  const r = Math.hypot(x, y, z);
  if (r < 1e-13) {
    if (l !== 0) return [0, 0];
    return [radial(n, 0, 0) / Math.sqrt(4 * Math.PI), 0];
  }
  const theta = Math.acos(Math.max(-1, Math.min(1, z / r)));
  const phi = Math.atan2(y, x);
  const R = radial(n, l, r);
  const [reY, imY] = ylmParts(l, m, theta, phi);
  return [R * reY, R * imY];
}

// ── Density grid & canvas rendering (x–z plane only) ─────────────────────────

const GRID = 260;
const PLOT_SIZE = 460;

interface DensityData {
  vals: Float64Array;
  maxDen: number;
}

function computeDensity(n: number, l: number, m: number, extent: number): DensityData {
  const vals = new Float64Array(GRID * GRID);
  let maxDen = 0;
  for (let j = 0; j < GRID; j++) {
    const z = extent * (1 - (2 * j) / (GRID - 1));
    for (let i = 0; i < GRID; i++) {
      const x = extent * ((2 * i) / (GRID - 1) - 1);
      const [re, im] = psiParts(n, l, m, x, 0, z);
      const den = re * re + im * im;
      vals[j * GRID + i] = den;
      if (den > maxDen) maxDen = den;
    }
  }
  return { vals, maxDen: maxDen || 1 };
}

function renderDensity(canvas: HTMLCanvasElement, { vals, maxDen }: DensityData): void {
  canvas.width = GRID;
  canvas.height = GRID;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const img = ctx.createImageData(GRID, GRID);
  for (let i = 0; i < vals.length; i++) {
    const t = Math.pow(Math.min(1, vals[i] / maxDen), 0.34);
    const rgb = d3.rgb(d3.interpolateInferno(t));
    const p = i * 4;
    img.data[p] = rgb.r;
    img.data[p + 1] = rgb.g;
    img.data[p + 2] = rgb.b;
    img.data[p + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
}

function renderContours(svg: SVGSVGElement, { vals, maxDen }: DensityData): void {
  const sel = d3.select(svg);
  sel.selectAll('*').remove();
  const scalar = Array.from(vals, v => v / maxDen);
  const thresholds = [0.015, 0.04, 0.09, 0.18, 0.34, 0.58];
  const contours = d3.contours().size([GRID, GRID]).thresholds(thresholds)(scalar);
  const path = d3.geoPath(d3.geoIdentity().scale(GRID / (GRID - 1)));
  sel
    .selectAll('path')
    .data(contours)
    .join('path')
    .attr('d', path)
    .attr('fill', 'none')
    .attr('stroke', '#fff')
    .attr('stroke-opacity', 0.55)
    .attr('stroke-width', 1.15)
    .attr('vector-effect', 'non-scaling-stroke');
}

// ── Component ─────────────────────────────────────────────────────────────────

function autoRadius(n: number, l: number): number {
  return Math.min(180, Math.max(3, 2.35 * n * n + 1.5 * l));
}

export default function QuantumHydrogenOrbitals2D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [n, setN] = useState(2);
  const [l, setL] = useState(1);
  const [m, setM] = useState(0);
  const [extent, setExtent] = useState(() => autoRadius(2, 1));

  const handleN = useCallback((newN: number) => {
    setN(newN);
    setL(prevL => {
      const newL = Math.min(prevL, newN - 1);
      setM(prevM => Math.min(prevM, newL));
      setExtent(autoRadius(newN, newL));
      return newL;
    });
  }, []);

  const handleL = useCallback((newL: number) => {
    setL(newL);
    setM(prevM => Math.min(prevM, newL));
    setExtent(autoRadius(n, newL));
  }, [n]);

  const handleM = useCallback((newM: number) => setM(newM), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const svg = svgRef.current;
    if (!canvas || !svg) return;
    const density = computeDensity(n, l, m, extent);
    renderDensity(canvas, density);
    renderContours(svg, density);
  }, [n, l, m, extent]);

  const radialNodes = n - l - 1;
  const angularNodes = l;
  const sliderStyle = { width: '132px', accentColor: '#2563eb' };

  return (
    <div style={{ textAlign: 'center', padding: '8px 0' }}>
      {/* Quantum number controls */}
      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '10px' }}>
        <label style={{ fontSize: '0.875rem', display: 'grid', gap: '2px', textAlign: 'left' }}>
          <span><strong>n</strong> = {n}</span>
          <input aria-label="Principal quantum number n" type="range" min="1" max="8" step="1" value={n} onChange={e => handleN(Number(e.target.value))} style={sliderStyle} />
        </label>
        <label style={{ fontSize: '0.875rem', display: 'grid', gap: '2px', textAlign: 'left' }}>
          <span><strong>l</strong> = {l}</span>
          <input aria-label="Angular momentum quantum number l" type="range" min="0" max={n - 1} step="1" value={l} onChange={e => handleL(Number(e.target.value))} style={sliderStyle} />
        </label>
        <label style={{ fontSize: '0.875rem', display: 'grid', gap: '2px', textAlign: 'left' }}>
          <span><strong>m</strong> = {m}</span>
          <input aria-label="Magnetic quantum number m" type="range" min="0" max={l} step="1" value={m} onChange={e => handleM(Number(e.target.value))} style={sliderStyle} />
        </label>
      </div>

      {/* View radius control */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
        <label style={{ fontSize: '0.8rem', color: '#6b7280' }}>
          View radius: <strong>{extent.toFixed(extent % 1 ? 1 : 0)}</strong> a₀
        </label>
        <input
          type="range"
          min={2}
          max={180}
          step={0.5}
          value={extent}
          onChange={e => setExtent(Number(e.target.value))}
          style={{ width: '260px' }}
        />
      </div>

      {/* Orbital info badge */}
      <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '8px', letterSpacing: '0.02em' }}>
        ψ<sub>{n},{l},{m}</sub>
        &nbsp;·&nbsp;Radial nodes: {radialNodes}
        &nbsp;·&nbsp;Angular nodes: {angularNodes}
      </div>

      {/* Density plot (x–z plane) */}
      <div style={{ position: 'relative', width: '100%', maxWidth: `${PLOT_SIZE}px`, aspectRatio: '1 / 1', margin: '0 auto', borderRadius: '10px', overflow: 'hidden', background: '#000' }}>
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', imageRendering: 'auto' }}
        />
        <svg
          ref={svgRef}
          viewBox={`0 0 ${GRID} ${GRID}`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
      </div>

      {/* Color-scale legend */}
      <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#6b7280' }}>
        <span>low |ψ|²</span>
        <div style={{
          width: '120px',
          height: '10px',
          borderRadius: '4px',
          background: 'linear-gradient(to right, #000004, #421058, #9c179e, #ed6925, #fcffa4)',
        }} />
        <span>high |ψ|²</span>
      </div>
    </div>
  );
}
