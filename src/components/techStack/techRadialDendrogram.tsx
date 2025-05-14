"use client";
import React, { useMemo, useState } from 'react';
import * as d3 from 'd3';
import techHierarchy from "@/content/techStack.json";
import TechModal from './techModal';

type Tree = {
    name: string;
    description?: string;
    level?: number;
    children?: Tree[];
};
type modalData = {
    title: string;
    description: string;
    imageUrl: string;
    progress: number;
}
const width = 500;
const height = 580;
const MARGIN = 80;

// 360 → 2π
const degToRad = (deg: number) => (deg * 2 * Math.PI) / 360;

const RadialDendrogram = () => {
    const [isPanning, setIsPanning] = useState(false);
    const [pointerStart, setPointerStart] = useState<{ x: number; y: number } | null>(null);
    const [modalDescription, setmodalDescription] = useState<modalData | null>(null);

    // Panning offset
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

    const hierarchy = useMemo(() => d3.hierarchy<Tree>(techHierarchy), []);

    const dendrogram = useMemo(() => {
        const radius = Math.min(width, height) / 2 - MARGIN;
        const dendrogramGenerator = d3.cluster<Tree>().size([360, radius]);
        return dendrogramGenerator(hierarchy);
    }, [hierarchy]);

    const linksGenerator = d3
        .linkRadial<d3.HierarchyPointLink<Tree>, d3.HierarchyPointNode<Tree>>()
        .angle((node) => degToRad(node.x))
        .radius((node) => node.y);

    const allEdges = dendrogram.links().map((link, key) => {
        // For the very first level, draw lines instead of radial links that would look bad at the root
        if (link.source.depth === 0) {
            return (
                <g
                    key={link.source + "_" + link.target + key}
                    transform={`rotate(${link.target.x - 90})`}
                >
                    <line x1={0} y1={0} x2={link.target.y} y2={0} stroke="grey" />
                </g>
            );
        }
        return (
            <path
                key={link.source + "_" + link.target + key}
                fill="none"
                stroke="grey"
                d={linksGenerator(link) || undefined}
            />
        );
    });

    const allNodes = dendrogram.descendants().map((node, key) => {
        const turnLabelUpsideDown = node.x > 180;

        return (
            <g
                key={node.id + `_${key}`}
                transform={`rotate(${node.x - 90}) translate(${node.y})`}
            >
                <circle cx={0} cy={0} r={5} stroke="transparent" fill={"#69b3a2"} style={{ cursor: "pointer" }}
                    onClick={() => !node.children && handleOpendrawer(node.data)}></circle>

                <text
                    x={node.children ? 0 : (turnLabelUpsideDown ? -15 : 15)}
                    y={0}
                    fontSize={12}
                    textAnchor={node.children ? "start" : (turnLabelUpsideDown ? "end" : "start")}
                    transform={node.children
                        ? `rotate(${-node.x + 90}) translate(10,0)`
                        : (turnLabelUpsideDown ? "rotate(180)" : "rotate(0)")}
                    alignmentBaseline="middle"
                    style={{ userSelect: 'none' }}
                >
                    {node.data.name}
                </text>
            </g>
        );
    });

    // Panning handlers
    const handlePointerDown = (e: React.PointerEvent) => {
        setIsPanning(true);
        setPointerStart({ x: e.clientX, y: e.clientY });
    };

    const handlePointerUp = () => {
        setIsPanning(false);
        setPointerStart(null);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isPanning || !pointerStart) return;

        const dx = e.clientX - pointerStart.x;
        const dy = e.clientY - pointerStart.y;

        const maxOffset = 50;

        const newOffset = {
            x: Math.max(Math.min(panOffset.x + dx, maxOffset), -maxOffset),
            y: Math.max(Math.min(panOffset.y + dy, maxOffset), -maxOffset),
        };

        setPanOffset(newOffset);
        setPointerStart({ x: e.clientX, y: e.clientY });
    };
    // Open drawer
    const handleOpendrawer = (node: Tree) => {
        const isSameData = modalDescription?.title === node.name

        if (isSameData) {
            // Close the drawer if the same data is already open
            setmodalDescription(null);
        } else {
            // Open or update the drawer with new data
            setmodalDescription({
                title: node.name,
                description: node.description || "",
                imageUrl: node.name,
                progress: node.level || 0,
            });
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            {modalDescription && <TechModal data={modalDescription} handleCloseModal={() => setmodalDescription(null)}></TechModal>}
            <svg
                width="100%"
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                onPointerMove={handlePointerMove}
                style={{
                    cursor: isPanning ? 'grabbing' : 'grab',
                    backgroundColor: "#f4f4f4",
                }}
            >
                <g transform={`translate(${width / 2 + panOffset.x}, ${height / 2 + panOffset.y})`}>
                    {allEdges}
                    {allNodes}
                </g>
            </svg>
        </div>
    );
};

export default RadialDendrogram;
