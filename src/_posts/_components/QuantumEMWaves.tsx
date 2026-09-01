"use client";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// Axes: X = propagation, Y = magnetic field, Z = electric field
const AZIM = -60 * (Math.PI / 180); // −60°
const ELEV = 25 * (Math.PI / 180);  //  25°
const SA = Math.sin(AZIM); // ≈ −0.866
const CA = Math.cos(AZIM); // ≈  0.500
const SE = Math.sin(ELEV); // ≈  0.423
const CE = Math.cos(ELEV); // ≈  0.906

// screen-right vector = (−sin a, cos a, 0)
// screen-up vector    = (−se·cos a, −se·sin a, ce)
function project(x: number, y: number, z: number): { svgX: number; svgY: number } {
  const screenRight = -SA * x + CA * y;
  const screenUp    = -SE * CA * x - SE * SA * y + CE * z;
  return { svgX: OX + SCALE * screenRight, svgY: OY - SCALE * screenUp };
}

const N_POINTS = 200;
const X_MAX = 4 * Math.PI;
const SCALE = 38;
const OX = 55;
const OY = 195;

// x-axis samples precomputed (propagation coordinates, 0 to 4π)
const X_SAMPLES = d3.range(N_POINTS).map(i => (X_MAX * i) / (N_POINTS - 1));

/** Build an SVG path string from a sequence of projected 2D points */
function buildPath(pts: { svgX: number; svgY: number }[]): string {
  return pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.svgX.toFixed(1)},${p.svgY.toFixed(1)}`)
    .join(' ');
}

export default function EMWavesD3() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const SVG_W = 600, SVG_H = 340;

    const sel = d3.select(svgEl);
    sel.selectAll('*').remove();
    sel.attr('viewBox', `0 0 ${SVG_W} ${SVG_H}`);

    // Background
    sel.append('rect').attr('width', SVG_W).attr('height', SVG_H).attr('fill', '#f7f8fc').attr('rx', 10);

    function label(x: number, y: number, z: number, text: string, fill: string, dx = 5, dy = 4) {
      const { svgX, svgY } = project(x, y, z);
      sel.append('text')
        .attr('x', svgX + dx).attr('y', svgY + dy)
        .attr('font-size', '11px').attr('fill', fill)
        .text(text);
    }

    // Propagation axis arrow line
    const p0 = project(0, 0, 0);
    const p1 = project(X_MAX, 0, 0);
    sel.append('line')
      .attr('x1', p0.svgX).attr('y1', p0.svgY)
      .attr('x2', p1.svgX).attr('y2', p1.svgY)
      .attr('stroke', '#111827').attr('stroke-width', 1.6);

    label(X_MAX, 0, 0, 'Propagation →', '#374151');

    // Axis-guide lines for B and E at origin
    const bEnd = project(0, 1.3, 0);
    sel.append('line').attr('x1', p0.svgX).attr('y1', p0.svgY)
      .attr('x2', bEnd.svgX).attr('y2', bEnd.svgY)
      .attr('stroke', '#d1fae5').attr('stroke-width', 1).attr('stroke-dasharray', '4,3');
    label(0, 1.4, 0, 'B (Magnetic)', '#14532d', 4, 0);

    const eEnd = project(0, 0, 1.3);
    sel.append('line').attr('x1', p0.svgX).attr('y1', p0.svgY)
      .attr('x2', eEnd.svgX).attr('y2', eEnd.svgY)
      .attr('stroke', '#dbeafe').attr('stroke-width', 1).attr('stroke-dasharray', '4,3');
    label(0, 0, 1.4, 'E (Electric)', '#1e3a8a', -72, 0);

    // ── Dynamic groups (ticks behind wave lines) ────────────────────────────
    const eTicks = sel.append('g');
    const bTicks = sel.append('g');
    const eLine = sel.append('path').attr('fill', 'none').attr('stroke', '#1d4ed8').attr('stroke-width', 2.5);
    const bLine = sel.append('path').attr('fill', 'none').attr('stroke', '#15803d').attr('stroke-width', 2.5);
    const eHitArea = sel.append('path').attr('fill', 'none').attr('stroke', 'transparent').attr('stroke-width', 18).style('cursor', 'crosshair');
    const bHitArea = sel.append('path').attr('fill', 'none').attr('stroke', 'transparent').attr('stroke-width', 18).style('cursor', 'crosshair');

    const tooltip = sel.append('g').attr('pointer-events', 'none').style('display', 'none');
    const tooltipBackground = tooltip.append('rect')
      .attr('fill', '#111827').attr('opacity', 0.92).attr('rx', 4)
      .attr('height', 24);
    const tooltipText = tooltip.append('text')
      .attr('x', 8).attr('y', 16).attr('font-size', '11px').attr('fill', '#ffffff');

    // ── Legend ───────────────────────────────────────────────────────────────
    const leg = sel.append('g').attr('transform', `translate(${SVG_W - 150}, 14)`);
    leg.append('line').attr('x2', 18).attr('stroke', '#1d4ed8').attr('stroke-width', 2.5);
    leg.append('text').attr('x', 22).attr('y', 4).attr('font-size', '11px').attr('fill', '#1d4ed8').text('Electric field (E)');
    leg.append('line').attr('y1', 18).attr('x2', 18).attr('y2', 18).attr('stroke', '#15803d').attr('stroke-width', 2.5);
    leg.append('text').attr('x', 22).attr('y', 22).attr('font-size', '11px').attr('fill', '#15803d').text('Magnetic field (B)');

    // ── Animation ────────────────────────────────────────────────────────────
    let frame = 0;
    let tid: ReturnType<typeof setTimeout>;
    let currentField = X_SAMPLES.map(() => 0);

    function showTooltip(fieldName: 'E' | 'B', index: number, x: number, y: number) {
      const label = `${fieldName === 'E' ? 'Electric field (E)' : 'Magnetic field (B)'}: ${currentField[index].toFixed(2)}`;
      const tooltipWidth = label.length * 6.2 + 16;
      const tooltipX = Math.min(x + 12, SVG_W - tooltipWidth - 6);
      const tooltipY = Math.max(y - 30, 6);

      tooltip.attr('transform', `translate(${tooltipX}, ${tooltipY})`).style('display', null);
      tooltipBackground.attr('width', tooltipWidth);
      tooltipText.text(label);
    }

    function hideTooltip() {
      eLine.attr('stroke-width', 2.5);
      bLine.attr('stroke-width', 2.5);
      tooltip.style('display', 'none');
    }

    function findClosestIndex(fieldName: 'E' | 'B', mouseX: number, mouseY: number) {
      let closestIndex = 0;
      let closestDistance = Infinity;
      for (let index = 0; index < X_SAMPLES.length; index++) {
        const point = fieldName === 'E'
          ? project(X_SAMPLES[index], 0, currentField[index])
          : project(X_SAMPLES[index], currentField[index], 0);
        const distance = Math.hypot(point.svgX - mouseX, point.svgY - mouseY);
        if (distance < closestDistance) {
          closestIndex = index;
          closestDistance = distance;
        }
      }
      return closestIndex;
    }

    function addHoverInteraction(hitArea: d3.Selection<SVGPathElement, unknown, null, undefined>, fieldName: 'E' | 'B') {
      hitArea
        .on('pointerenter pointermove', function(event) {
          const [mouseX, mouseY] = d3.pointer(event, svgEl);
          const index = findClosestIndex(fieldName, mouseX, mouseY);

          eLine.attr('stroke-width', fieldName === 'E' ? 4 : 2.5);
          bLine.attr('stroke-width', fieldName === 'B' ? 4 : 2.5);
          showTooltip(fieldName, index, mouseX, mouseY);
        })
        .on('pointerleave', hideTooltip);
    }

    addHoverInteraction(eHitArea, 'E');
    addHoverInteraction(bHitArea, 'B');

    function update() {
      // E and B share the same amplitude: sin(kx − ωt)
      const field = X_SAMPLES.map(x => Math.sin(x - frame * 0.1));
      currentField = field;

      // E oscillates in the Z plane: (x, 0, field)
      const ePath = buildPath(X_SAMPLES.map((x, i) => project(x, 0, field[i])));
      eLine.attr('d', ePath);
      eHitArea.attr('d', ePath);

      // B oscillates in the Y plane: (x, field, 0)
      const bPath = buildPath(X_SAMPLES.map((x, i) => project(x, field[i], 0)));
      bLine.attr('d', bPath);
      bHitArea.attr('d', bPath);

      // Tick marks from propagation axis to each field value, every 8 samples
      const eTick: { x1: number; y1: number; x2: number; y2: number }[] = [];
      const bTick: { x1: number; y1: number; x2: number; y2: number }[] = [];
      for (let i = 0; i < X_SAMPLES.length; i += 8) {
        const ax   = X_SAMPLES[i];
        const base = project(ax, 0, 0);
        const eTo  = project(ax, 0, field[i]);
        const bTo  = project(ax, field[i], 0);
        eTick.push({ x1: base.svgX, y1: base.svgY, x2: eTo.svgX, y2: eTo.svgY });
        bTick.push({ x1: base.svgX, y1: base.svgY, x2: bTo.svgX, y2: bTo.svgY });
      }

      const eTickSel = eTicks.selectAll<SVGLineElement, typeof eTick[0]>('line').data(eTick);
      eTickSel.enter().append('line').merge(eTickSel)
        .attr('x1', d => d.x1).attr('y1', d => d.y1)
        .attr('x2', d => d.x2).attr('y2', d => d.y2)
        .attr('stroke', '#1d4ed8').attr('stroke-width', 0.9).attr('opacity', 0.45);
      eTickSel.exit().remove();

      const bTickSel = bTicks.selectAll<SVGLineElement, typeof bTick[0]>('line').data(bTick);
      bTickSel.enter().append('line').merge(bTickSel)
        .attr('x1', d => d.x1).attr('y1', d => d.y1)
        .attr('x2', d => d.x2).attr('y2', d => d.y2)
        .attr('stroke', '#15803d').attr('stroke-width', 0.9).attr('opacity', 0.45);
      bTickSel.exit().remove();

      frame++;
      tid = setTimeout(update, 30);
    }

    update();
    return () => clearTimeout(tid);
  }, []);

  return (
    <svg
      ref={svgRef}
      style={{ width: '100%', maxWidth: '600px', aspectRatio: '600 / 340', height: 'auto', display: 'block', margin: '0 auto', padding: '8px', boxSizing: 'border-box' }}
    />
  );
}
