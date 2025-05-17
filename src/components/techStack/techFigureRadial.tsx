"use client";

import React, { useState } from 'react';
import TechModal from './techModal';
import RadialDendrogram from '../d3/RadialDendogram';
import techHierarchy from "@/content/techStack_v2.json";
import { TechStackData } from '@/lib/interfaces';

type modalData = {
    title: string;
    description: string;
    imageUrl: string;
    progress: number;
}

const TechFigureRadial = () => {

    const [modalDescription, setmodalDescription] = useState<modalData | null>(null);

    // Open drawer
    const handleOpendrawer = (node: TechStackData) => {
        const isSameData = modalDescription?.title === node.name

        if (isSameData) {
            // Close the drawer if the same data is already open
            setmodalDescription(null);
        } else {
            // Open or update the drawer with new data
            setmodalDescription({
                title: node.name,
                description: node.description || "",
                imageUrl: node.imageUrl || "",
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
            <RadialDendrogram
                data={techHierarchy}
                handleNodeClick={handleOpendrawer} />
        </div>
    );
};

export default TechFigureRadial;
