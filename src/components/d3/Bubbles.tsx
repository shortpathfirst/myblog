"use client";
import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import techStack from '@/content/techStack_v2.json'

export type GroupNode = {
    group?: number;
    groupName?: string;
    imageUrl?: string;
    value: number;
    children?: GroupNode[];
};
type D3Node = d3.HierarchyCircularNode<GroupNode> & d3.SimulationNodeDatum;

type InputNode = {
    name: string;
    children: {
        name: string;
        level: number;
        description: string;
        imageUrl: string;
    }[];
};

type RootInput = {
    name: string;
    children: InputNode[];
};

export function mapToGroupNode(input: RootInput): GroupNode {
    return {
        value: 0,
        children: input.children.map((group, groupIndex) => ({
            value: 0,
            children: group.children.map(child => ({
                group: groupIndex,
                groupName: group.name,
                imageUrl: child.imageUrl,
                value: child.level
            }))
        }))
    };
}
const Bubbles = () => {
    const m = 10; //Number of groups
    const height = 600;
    const width = 600;
    const color = d3.scaleOrdinal(d3.range(m), d3.schemeCategory10);

    const svgRef = useRef<SVGSVGElement | null>(null);

    const drag = (simulation: d3.Simulation<D3Node, undefined>) => {
        function dragstarted(event: d3.D3DragEvent<SVGCircleElement, D3Node, D3Node>, d: D3Node) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event: d3.D3DragEvent<SVGCircleElement, D3Node, D3Node>, d: D3Node) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event: d3.D3DragEvent<SVGCircleElement, D3Node, D3Node>, d: D3Node) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag<SVGCircleElement, D3Node>()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    };

    function centroid(nodes: D3Node[]) {
        let x = 0;
        let y = 0;
        let z = 0;
        for (const d of nodes) {
            let k = d.r ** 2;
            x += d.x * k;
            y += d.y * k;
            z += k;
        }
        return { x: x / z, y: y / z };
    }
    function forceCollide() {
        const alpha = 0.4; // fixed for greater rigidity!
        const padding1 = 2; // separation between same-color nodes
        const padding2 = 6; // separation between different-color nodes
        let nodes: D3Node[];
        let maxRadius: number;

        function force() {
            const quadtree = d3.quadtree(nodes, d => d.x, d => d.y);
            for (const d of nodes) {
                const r = d.r + maxRadius;
                const nx1 = d.x - r, ny1 = d.y - r;
                const nx2 = d.x + r, ny2 = d.y + r;
                quadtree.visit((q, x1, y1, x2, y2) => {
                    if (!q.length) {
                        let qLeaf = q as d3.QuadtreeLeaf<D3Node> | null;
                        do {
                            if (qLeaf?.data && qLeaf.data !== d) {
                                const r = d.r + qLeaf.data.r + (d.data.group === qLeaf.data.data.group ? padding1 : padding2);
                                let x = d.x - qLeaf.data.x;
                                let y = d.y - qLeaf.data.y;
                                let l = Math.hypot(x, y);
                                if (l < r) {
                                    l = (l - r) / l * alpha;
                                    d.x -= x *= l;
                                    d.y -= y *= l;
                                    qLeaf.data.x += x;
                                    qLeaf.data.y += y;
                                }
                            }
                            qLeaf = qLeaf?.next ?? null;
                        } while (qLeaf);
                    }
                    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                });
            }
        }

        force.initialize = (_: D3Node[]) => {
            nodes = _;
            maxRadius = d3.max(nodes, d => d.r)! + Math.max(padding1, padding2);
        };

        return Object.assign(force, { initialize: force.initialize });
    }


    function forceCluster() {
        const strength = 0.2;
        let nodes: D3Node[];;

        function force(alpha: number) {
            const centroids = d3.rollup(nodes, centroid, d => d.data.group);
            const l = alpha * strength;
            for (const d of nodes) {
                const { x: cx, y: cy } = centroids.get(d.data.group)!;
                if (!d.vx || !d.vy) break;
                d.vx -= (d.x - cx) * l;
                d.vy -= (d.y - cy) * l;
            }
        }

        force.initialize = (_: D3Node[]) => nodes = _;

        return force;
    }

    useEffect(() => {

        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);

        const nodes = d3.pack<GroupNode>()
            .size([width, height])
            .padding(1)(
                d3.hierarchy(mapToGroupNode(techStack) as GroupNode)
                    .sum(d => d.value)
            ).leaves();

        const simulation = d3.forceSimulation(nodes)
            .force("x", d3.forceX(width / 2).strength(0.01))
            .force("y", d3.forceY(height / 2).strength(0.01))
            .force("cluster", forceCluster())
            .force("collide", forceCollide());

        // Only circles
        // const node = svg.append("g")
        //     .selectAll("circle")
        //     .data(nodes)
        //     .join("circle")
        //     .attr("cx", d => d.x)
        //     .attr("cy", d => d.y)
        //     .attr("fill", d => color(d.data.group ?? 0))
        //     // @ts-ignore
        //     .call(drag(simulation));

        const node = svg.append("g")
            .selectAll("g")
            .data(nodes)
            .join("g")
            .attr("transform", d => `translate(${d.x},${d.y})`)
            // @ts-ignore
            .call(drag(simulation));  // drag applied to the group

        node.append("circle")
            .attr("r", d => d.r)
            .attr("fill", d => color(d.data.group ?? 0));

        const imageRadiusFactor = 0.8;

        node.append("image")
            .attr("xlink:href", d => d.data.imageUrl ?? "")
            .attr("x", d => -d.r * imageRadiusFactor)  // move top-left corner so center matches (0,0)
            .attr("y", d => -d.r * imageRadiusFactor)
            .attr("width", d => d.r * 2 * imageRadiusFactor)
            .attr("height", d => d.r * 2 * imageRadiusFactor)
            .attr("clip-path", "circle()");

        node.transition()
            .delay((d, i) => Math.random() * 500)
            .duration(750)
            .attrTween("r", d => {
                const i = d3.interpolate(0, d.r);
                return t => {
                    d.r = i(t);
                    return i(t).toString();
                };
            });
        // Group the nodes by group
        const groupNodes = d3.groups(nodes, d => d.data.group);

        // Compute centroid per group
        const centroids = groupNodes.map(([group, groupNodes]) => {
            const { x, y } = centroid(groupNodes);
            // Get groupName from first node in group
            const groupName = groupNodes[0].data.groupName ?? `Group ${group}`;
            return { group, x, y, groupName };
        });

        // Append group labels
        const labels = svg.append("g")
            .selectAll("text")
            .data(centroids)
            .join("text")
            .attr("x", d => d.x)
            .attr("y", d => d.y)
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .style("font-size", "24px")
            .style("font-weight", "600")
            .style("fill", "#333")
            .attr("stroke", "white")//Add stroke to make it visible
            .attr("stroke-width", 4)
            .attr("paint-order", "stroke")
            .attr("fill", "black")
            .style("user-select", "none")
            .text(d => d.groupName)


        simulation.on("tick", () => {
            // Singolar circle
            // node
            //     .attr("cx", d => d.x)
            //     .attr("cy", d => d.y);
            // With image
            node.attr("transform", d => `translate(${d.x},${d.y})`);

            // Update label positions dynamically
            const updatedCentroids = d3.groups(nodes, d => d.data.group)
                .map(([group, groupNodes]) => {
                    const { x, y } = centroid(groupNodes);
                    return { group, x, y };
                });

            labels
                .data(updatedCentroids)
                .attr("x", d => d.x)
                .attr("y", d => d.y);
        });

    }, [techStack])


    return (
        <svg
            ref={svgRef}
            width="100%"
            height={height * 0.8}
            viewBox={`0 0 ${width} ${height}`}
        >
        </svg>
    )
}

export default Bubbles