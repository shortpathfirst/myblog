"use client";

import React, { useState } from 'react';
import TechModal from './techModal';
import RadialDendrogram from '../d3/RadialDendogram';
import techHierarchy from "@/content/techStack_v2.json";
import { mapToGroupNode } from '@/lib/mapTechToGroupNode';
import Bubbles from '../d3/Bubbles';
import styles from './techStack.module.css'

export type modalData = {
    title: string;
    description: string;
    imageUrl: string;
    progress: number;
}

const TechFigure = () => {

    const [modalDescription, setmodalDescription] = useState<modalData | null>(null);
    const [figureType, setFigureType] = useState<"radial" | "bubble">("radial");
    // Open drawer
    const handleOpendrawer = ({ title, description, imageUrl, progress }: modalData) => {

        const isSameData = modalDescription?.title === title

        if (isSameData) {
            // Close the drawer if the same data is already open
            setmodalDescription(null);
        } else {
            // Open or update the drawer with new data
            setmodalDescription({
                title: title,
                description: description,
                imageUrl: imageUrl,
                progress: progress,
            });
        }
    };

    return (
        <div className={styles.techFigure}>

            {
                modalDescription &&
                <TechModal
                    data={modalDescription}
                    handleCloseModal={() => setmodalDescription(null)} />
            }
            {
                figureType === "radial" &&
                <RadialDendrogram
                    data={techHierarchy}
                    handleNodeClick={handleOpendrawer} />}
            {
                figureType === "bubble" &&
                <Bubbles
                    data={mapToGroupNode(techHierarchy)}
                    handleNodeClick={handleOpendrawer} />
            }
            <button
                className={styles.figureSwitch}
                onClick={() => setFigureType((figure) => figure === "bubble" ? 'radial' : 'bubble')}>
                {figureType === "bubble" ? 'Radial Chart' : 'Bubble Chart'}
            </button>
        </div>
    );
};

export default TechFigure;
