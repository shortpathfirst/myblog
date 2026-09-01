"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const W = 320;
const H = 180;
const PAD = 28;
const X_VALUES = d3.range(500).map(index => -5 + (10 * index) / 499);

function factorial(value: number): number {
  let result = 1;
  for (let index = 2; index <= value; index++) result *= index;
  return result;
}

function hermite(order: number, xValues: number[]): number[] {
  if (order === 0) return xValues.map(() => 1);
  if (order === 1) return xValues.map(value => 2 * value);

  let previous = xValues.map(() => 1);
  let current = xValues.map(value => 2 * value);
  for (let index = 1; index < order; index++) {
    const next = xValues.map((value, pointIndex) => 2 * value * current[pointIndex] - 2 * index * previous[pointIndex]);
    previous = current;
    current = next;
  }
  return current;
}

function eigenstate(order: number): number[] {
  const polynomial = hermite(order, X_VALUES);
  const normalization = Math.PI ** -0.25 / Math.sqrt(2 ** order * factorial(order));
  return X_VALUES.map((value, index) => normalization * Math.exp(-(value * value) / 2) * polynomial[index]);
}

function springPath(massPosition: number, xScale: d3.ScaleLinear<number, number>): string {
  const anchor = -5;
  const points = d3.range(120).map(index => {
    const x = anchor + ((massPosition - anchor) * index) / 119;
    const offset = index === 0 || index === 119 ? 0 : index % 2 === 0 ? -9 : 9;
    return [xScale(x), H / 2 + offset] as [number, number];
  });
  return d3.line<[number, number]>()(points) ?? '';
}

export default function QuantumHarmonicOscillator() {
  const classicalRef = useRef<SVGSVGElement>(null);
  const quantumRef = useRef<SVGSVGElement>(null);
  const [amplitude, setAmplitude] = useState(1);
  const [nodes, setNodes] = useState(0);

  useEffect(() => {
    const svgElement = classicalRef.current;
    if (!svgElement) return;

    const svg = d3.select(svgElement);
    svg.selectAll('*').remove();
    const xScale = d3.scaleLinear().domain([-5, 5]).range([PAD, W - PAD]);
    const baseline = H / 2;

    svg.append('line').attr('x1', PAD).attr('x2', W - PAD).attr('y1', baseline).attr('y2', baseline).attr('stroke', '#94a3b8');
    svg.append('circle').attr('cx', xScale(-5)).attr('cy', baseline).attr('r', 7).attr('fill', '#334155');
    const spring = svg.append('path').attr('fill', 'none').attr('stroke', '#334155').attr('stroke-width', 2);
    const mass = svg.append('circle').attr('cy', baseline).attr('r', 16).attr('fill', '#f97316');
    const amplitudeGuide = svg.append('line').attr('stroke', '#fb923c').attr('stroke-dasharray', '4,4');

    let animationFrame: number;
    const animate = (time: number) => {
      const position = amplitude * Math.cos(time / 650);
      spring.attr('d', springPath(position, xScale));
      mass.attr('cx', xScale(position));
      amplitudeGuide.attr('x1', xScale(-amplitude)).attr('x2', xScale(amplitude)).attr('y1', baseline + 34).attr('y2', baseline + 34);
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [amplitude]);

  useEffect(() => {
    const svgElement = quantumRef.current;
    if (!svgElement) return;

    const svg = d3.select(svgElement);
    svg.selectAll('*').remove();
    const xScale = d3.scaleLinear().domain([-5, 5]).range([PAD, W - PAD]);
    const yScale = d3.scaleLinear().domain([-1.3, 1.3]).range([H - PAD, PAD]);
    const wave = eigenstate(nodes);
    const line = d3.line<{ x: number; y: number }>().x(point => xScale(point.x)).y(point => yScale(point.y));

    svg.append('path')
      .attr('d', line(X_VALUES.map(x => ({ x, y: Math.min(1.2, (x * x) / 8 - 1.1) }))) ?? '')
      .attr('fill', 'none').attr('stroke', '#94a3b8').attr('stroke-width', 1.5);
    svg.append('line').attr('x1', PAD).attr('x2', W - PAD).attr('y1', yScale(0)).attr('y2', yScale(0)).attr('stroke', '#cbd5e1');
    svg.append('text').attr('x', PAD).attr('y', PAD - 10).attr('font-size', 12).attr('fill', '#64748b').text(`Energy level n = ${nodes}`);

    const realPath = svg.append('path').attr('fill', 'none').attr('stroke', '#2563eb').attr('stroke-width', 2.5);
    const imaginaryPath = svg.append('path').attr('fill', 'none').attr('stroke', '#dc2626').attr('stroke-width', 2).attr('stroke-dasharray', '5,4');

    let animationFrame: number;
    const animate = (time: number) => {
      const phase = (nodes + 0.5) * time / 900;
      realPath.attr('d', line(X_VALUES.map((x, index) => ({ x, y: wave[index] * Math.cos(phase) }))) ?? '');
      imaginaryPath.attr('d', line(X_VALUES.map((x, index) => ({ x, y: wave[index] * Math.sin(phase) }))) ?? '');
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [nodes]);

  const controlStyle = { width: '100%', accentColor: '#2563eb' };
  const panelStyle = { background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,.07)', padding: 10 };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
      <section style={panelStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
          <strong>Classical oscillator</strong>
          <span style={{ color: '#c2410c', fontSize: '0.9rem' }}>A = {amplitude.toFixed(1)}</span>
        </div>
        <svg ref={classicalRef} viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', aspectRatio: `${W} / ${H}`, display: 'block' }} />
        <input aria-label="Classical oscillator amplitude" type="range" min="1" max="5" step="0.5" value={amplitude} onChange={event => setAmplitude(Number(event.target.value))} style={controlStyle} />
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.75rem' }}><span>1.0</span><span>5.0</span></div>
      </section>

      <section style={panelStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
          <strong>Quantum oscillator</strong>
          <span style={{ color: '#1d4ed8', fontSize: '0.9rem' }}>{nodes} {nodes === 1 ? 'node' : 'nodes'}</span>
        </div>
        <svg ref={quantumRef} viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', aspectRatio: `${W} / ${H}`, display: 'block' }} />
        <input aria-label="Quantum eigenstate node count" type="range" min="0" max="5" step="1" value={nodes} onChange={event => setNodes(Number(event.target.value))} style={controlStyle} />
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.75rem' }}><span>0</span><span>5</span></div>
      </section>
      </div>

      <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 10, fontSize: '0.8rem' }}>
        <span style={{ color: '#2563eb' }}>Real part</span>
        <span style={{ color: '#dc2626' }}>Imaginary part</span>
      </div>
    </div>
  );
}