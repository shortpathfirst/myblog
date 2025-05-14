"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import techHierarchy from "@/content/techStack.json";
import TechModal from './techModal';

type Tree = {
    name: string;
    imageUrl?: string;
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
const width = 950;
const height = 950;
const MARGIN = 60;
const panOffset = 30;

const degToRad = (deg: number) => (deg * 2 * Math.PI) / 360; // 360 → 2π

const RadialDendrogram = () => {

    const [modalDescription, setmodalDescription] = useState<modalData | null>(null);

    const svgRef = useRef<SVGSVGElement | null>(null);
    const groupRef = useRef<SVGGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current || !groupRef.current) return;
        const svg = d3.select(svgRef.current);
        const group = d3.select(groupRef.current);

        const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.8, 5])
            .translateExtent([[-width / 2 - panOffset, -height / 2 - panOffset], [width / 2 + panOffset, height / 2 + panOffset]])
            .on("zoom", (event) => {
                group.attr("transform", event.transform);
            });

        svg.call(zoomBehavior);
        svg.call(
            zoomBehavior.transform,
            d3.zoomIdentity.translate(width / 2, height / 2)
        );
        return () => {
            svg.on(".zoom", null); // Clean up zoom event listener

        };
    }, []);

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
                style={{ cursor: "pointer" }}
                onClick={() => !node.children && handleOpendrawer(node.data)}
            >
                {node.children && <rect
                    x={-80}
                    y={0}
                    width={180}
                    height={50}
                    rx={20}
                    ry={20}
                    fill={"rgba(0, 0, 0, 0.1)"}
                    transform={node.children
                        ? `rotate(${-node.x + 90}) translate(10,0)`
                        : (turnLabelUpsideDown ? "rotate(180)" : "rotate(0)")}

                />}
                {/* Image inside the card */}
                {!node.children && <image
                    href={node.data.imageUrl || "/images/qgis-icon.png"}
                    x={-30}
                    y={-25}
                    width={60}
                    height={40}
                    transform={node.children
                        ? `rotate(${-node.x + 90}) translate(10,0)`
                        : (turnLabelUpsideDown ? "rotate(180)" : "rotate(0)")}
                    preserveAspectRatio="xMidYMid meet"
                />}
                {/* White background of text */}
                <text
                    x={0}
                    y={22}
                    transform={node.children
                        ? `rotate(${-node.x + 90}) translate(10,0)`
                        : (turnLabelUpsideDown ? "rotate(180)" : "rotate(0)")}
                    textAnchor="middle"
                    fontSize={node.children ? 26 : 20}
                    fill='none'
                    stroke='white'
                    strokeWidth={5}
                    strokeLinejoin='round'
                    alignmentBaseline="middle"
                    style={{ userSelect: 'none' }}
                >
                    {node.data.name}
                </text>
                {/* Text label below the image */}
                <text
                    x={0}
                    y={22}
                    transform={node.children
                        ? `rotate(${-node.x + 90}) translate(10,0)`
                        : (turnLabelUpsideDown ? "rotate(180)" : "rotate(0)")}
                    textAnchor="middle"
                    fontSize={node.children ? 26 : 20}
                    alignmentBaseline="middle"
                    style={{ userSelect: 'none' }}
                >
                    {node.data.name}
                </text>

            </g>
        );
    });

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
            {
                modalDescription &&
                <TechModal
                    data={modalDescription}
                    handleCloseModal={() => setmodalDescription(null)} />
            }
            <svg
                ref={svgRef}
                width="100%"
                height={height * 0.8}
                viewBox={`0 0 ${width} ${height}`}
                style={{
                    borderRadius: "80px",
                    cursor: 'grab',
                    backgroundColor: "#f4f4f4",
                }}
            >
                <g ref={groupRef} transform={`translate(${width / 2}, ${height / 2})`}>
                    {allEdges}
                    {allNodes}
                </g>
            </svg>
        </div>
    );
};

export default RadialDendrogram;
