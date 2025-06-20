"use client";

import React, { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { TechStackData } from '@/lib/interfaces';
import { modalData } from '../techStack/techFigure';
import styles from './d3styles.module.css'
import { baseUrl } from '@/lib/constants';

// type TreeData = {
//     name: string;
//     imageUrl?: string;
//     children?: TreeData[];
// };
type TreeData = TechStackData

type RadialDendogramProps = {
    width?: number;
    height?: number;
    data: TechStackData,
    handleNodeClick: (node: modalData) => void,
    setRadialPositions: (React.Dispatch<React.SetStateAction<Map<string, { x: number; y: number; }>>>),
}

const MARGIN = 60;
const panOffset = 30;

const degToRad = (deg: number) => (deg * 2 * Math.PI) / 360; // 360 → 2π
const polarToCartesian = (angle: number, radius: number,) => {
    const theta = (angle * Math.PI) / 180;
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    return { x, y };
}

const RadialDendrogram = ({ data, handleNodeClick, setRadialPositions, width = 950, height = 950 }: RadialDendogramProps) => {

    const svgRef = useRef<SVGSVGElement | null>(null);
    const groupRef = useRef<SVGGElement | null>(null);
    const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

    useEffect(() => {
        if (!svgRef.current || !groupRef.current)
            return;

        const svg = d3.select(svgRef.current);
        const group = d3.select(groupRef.current);

        const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.8, 5])
            .translateExtent([
                [-width / 2 - panOffset, -height / 2 - panOffset],
                [width + panOffset, height / 2 + panOffset]]
            )
            .on("zoom", (event) => {
                group.attr("transform", event.transform);
            });

        zoomRef.current = zoomBehavior;

        svg.call(zoomBehavior);
        svg.call(
            zoomBehavior.transform,
            d3.zoomIdentity.translate(width / 2, height / 2)
        );

        return () => {
            // Clean up zoom event listener
            svg.on(".zoom", null);
        };
    }, [width, height]);

    const hierarchy = useMemo(() => d3.hierarchy<TreeData>(data), [data]);

    const dendrogram = useMemo(() => {
        const radius = Math.min(width, height) / 2 - MARGIN;
        const dendrogramGenerator = d3.cluster<TreeData>().size([360, radius]);
        return dendrogramGenerator(hierarchy);
    }, [hierarchy, width, height]);


    useEffect(() => {
        if (!dendrogram) return;

        const newRadialPositions = new Map();

        dendrogram.descendants().forEach(node => {
            const { x, y } = polarToCartesian(node.x - 90, node.y); // subtract 90 to align with top
            newRadialPositions.set(node.data.name, { x, y });
        });

        setRadialPositions(newRadialPositions);
    }, [dendrogram, setRadialPositions]);

    const linksGenerator = d3
        .linkRadial<d3.HierarchyPointLink<TreeData>, d3.HierarchyPointNode<TreeData>>()
        .angle((node) => degToRad(node.x))
        .radius((node) => node.y);

    const zoomToNode = (x: number, y: number) => {
        if (!zoomRef.current || !svgRef.current) return;

        const scale = 2;

        const transform = d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(scale)
            .translate(-x, -y);

        d3.select(svgRef.current).transition()
            .transition()
            .duration(750)
            .call(zoomRef.current.transform, transform);
    };

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
                onClick={() => {
                    if (!node.children) {

                        const { x, y } = polarToCartesian(node.x - 90, node.y); // subtract 90 to align with top
                        zoomToNode(x * 0.85, y);//Offset by 25%

                        handleNodeClick({
                            title: node.data.name || "",
                            description: node.data.description || "",
                            imageUrl: node.data.imageUrl || "",
                            progress: node.data.level || 0,
                        });
                    }
                }}

            >
                {node.children ?
                    <rect
                        x={-80}
                        y={-4}
                        width={180}
                        height={50}
                        rx={20}
                        ry={20}
                        fill="url(#fadeGradient)" // <def> of gradient
                        transform={node.children
                            ? `rotate(${-node.x + 90}) translate(10,0)`
                            : (turnLabelUpsideDown ? "rotate(180)" : "rotate(0)")}

                    /> :
                    <image
                        href={node.data.imageUrl || `${baseUrl}/file.svg`}
                        x={-30}
                        y={-25}
                        width={60}
                        height={40}
                        transform={`rotate(${-node.x + 90}) translate(10,0)`}
                        // transform={node.children
                        //     ? `rotate(${-node.x + 90}) translate(10,0)`
                        //     : (turnLabelUpsideDown ? "rotate(180)" : "rotate(0)")}
                        preserveAspectRatio="xMidYMid meet"
                    />
                }

                <text
                    x={0}
                    y={22}
                    transform={`rotate(${-node.x + 90}) translate(10,0)`}
                    // transform={node.children
                    //     ? `rotate(${-node.x + 90}) translate(10,0)`
                    //     : (turnLabelUpsideDown ? "rotate(180)" : "rotate(0)")}
                    textAnchor="middle"
                    fontSize={node.children ? 26 : 20}
                    fill='#333'
                    stroke='white'
                    strokeWidth={5}
                    paintOrder='stroke'
                    strokeLinejoin='round'
                    alignmentBaseline="middle"
                    style={{ userSelect: 'none' }}
                >
                    {node.data.name}
                </text>
            </g>
        );
    });

    return (
        <svg
            className={styles.imageEffect}
            ref={svgRef}
            width="100%"
            height={height * 0.8}
            viewBox={`0 0 ${width} ${height}`}
        >
            <defs>
                {/* Linear gradient for rect */}
                <linearGradient id="fadeGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" style={{ stopColor: "white", stopOpacity: 0 }} />
                    <stop offset="25%" style={{ stopColor: "black", stopOpacity: 0.2 }} />
                    <stop offset="85%" style={{ stopColor: "black", stopOpacity: 0.2 }} />
                    <stop offset="100%" style={{ stopColor: "white", stopOpacity: 0 }} />
                </linearGradient>
            </defs>
            <g ref={groupRef} transform={`translate(${width / 2}, ${height / 2})`}>
                {allEdges}
                {allNodes}
            </g>
        </svg>
    );
};

export default RadialDendrogram;
