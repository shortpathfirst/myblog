"use client";
import React, { useMemo, useState } from 'react';
import * as d3 from 'd3';
import techHierarchy from "@/content/techStack.json";
import TechModal from './techModal';

type Tree = {
    name: string;
    description?:string;
    level?: number;
    children?: Tree[];
    _children?: Tree[];
};

type modalData = {
    title: string;
    description: string;
    imageUrl: string;
    progress: number;
};

const width = 500;
const height = 580;
const MARGIN = 80;

const Dendrogram = () => {
    const [isPanning, setIsPanning] = useState(false);
    const [pointerStart, setPointerStart] = useState<{ x: number; y: number } | null>(null);
    const [modalDescription, setmodalDescription] = useState<modalData | null>(null);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

    const [data, setData] = useState<Tree>(() => JSON.parse(JSON.stringify(techHierarchy)));

    const hierarchy = useMemo(() => d3.hierarchy<Tree>(data), [data]);

    const dendrogram = useMemo(() => {
        const cluster = d3.cluster<Tree>().size([height - 2 * MARGIN, width - 2 * MARGIN]);
        return cluster(hierarchy);
    }, [hierarchy]);

    const linkGenerator = d3
        .linkHorizontal<d3.HierarchyPointLink<Tree>, d3.HierarchyPointNode<Tree>>()
        .x(d => d.y)
        .y(d => d.x);

    const toggleNode = (node: d3.HierarchyPointNode<Tree>) => {
        const updated = { ...data };

        const findAndToggle = (current: Tree): boolean => {
            if (current.name === node.data.name) {
                if (current.children) {
                    current._children = current.children;
                    current.children = undefined;
                } else if (current._children) {
                    current.children = current._children;
                    current._children = undefined;
                }
                return true;
            }
            const children = current.children || current._children;
            if (children) {
                for (let child of children) {
                    if (findAndToggle(child)) return true;
                }
            }
            return false;
        };

        findAndToggle(updated);
        setData(updated);
    };

    const handleOpendrawer = (node: Tree) => {
        const isSameData = modalDescription?.title === node.name;

        if (isSameData) {
            setmodalDescription(null);
        } else {
            setmodalDescription({
                title: node.name,
                description: node.description || "",
                imageUrl: node.name,
                progress: node.level || 0,
            });
        }
    };

    const allEdges = dendrogram.links().map((link, key) => (
        <path
            key={`link-${key}`}
            fill="none"
            stroke="grey"
            d={linkGenerator(link) || undefined}
            style={{
                transition: 'all 0.3s ease',
            }}
        />
    ));

    const allNodes = dendrogram.descendants().map((node, key) => (
        <g
            key={`node-${key}`}
            transform={`translate(${node.y},${node.x})`}
            style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
            onClick={() => {
                if (node.children || node.data._children) {
                    toggleNode(node);
                } else {
                    handleOpendrawer(node.data);
                }
            }}
        >
            <circle
                r={5}
                fill={node.children || node.data._children ? "#69b3a2" : "#888"}
                style={{
                    transition: 'fill 0.3s ease',
                }}
            />
            <text
                dx={node.children ? -10 : 10}
                dy={5}
                fontSize={12}
                textAnchor={node.children ? "end" : "start"}
                style={{
                    userSelect: 'none',
                    transition: 'transform 0.3s ease, fill 0.3s ease',
                }}
            >
                {node.data.name}
            </text>
        </g>
    ));

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

    return (
        <div style={{ position: 'relative' }}>
            {modalDescription && (
                <TechModal data={modalDescription} handleCloseModal={() => setmodalDescription(null)} />
            )}
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
                <g transform={`translate(${MARGIN + panOffset.x}, ${MARGIN + panOffset.y})`}>
                    {allEdges}
                    {allNodes}
                </g>
            </svg>
        </div>
    );
};

export default Dendrogram;
