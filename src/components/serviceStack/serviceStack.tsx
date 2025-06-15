"use client";

import React, { useState } from 'react'
import styles from './serviceStack.module.css'
import Title from '../header/title'
import Image from 'next/image'
import serviceList from '@/content/portfolioServices.json'

function ServiceStack() {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedService, setSelectedService] = useState<null | {
        name: string;
        url: string;
        description: string;
        points: string[];
    }>(null)

    function openModal(service: typeof selectedService) {
        setSelectedService(service)
        setModalOpen(true)
    }

    function closeModal() {
        setModalOpen(false)
        setSelectedService(null)
    }

    return (
        <section className={styles.section}>
            <div className={styles.titleBand}>
                <Title>Expertise</Title>
            </div>
            <div className={styles.gridWrapper}>
                {
                    serviceList.map((service, i) => (
                        <div className={styles.card} key={i} onClick={() => openModal(service)}>
                            <Image className={styles.logo} height={50} width={50} src={service.url || '/file.svg'} alt={service.name} />
                            <h2>{service.name.toUpperCase()}</h2>
                        </div>
                    ))
                }
            </div>
            {/* Modal */}
            {modalOpen && selectedService && (
                <ModalServiceDescription openModal={openModal} selectedService={selectedService} closeModal={closeModal} />

            )}
        </section>
    )
}
export default ServiceStack

type modalServiceProps = {
    openModal(service: {
        name: string;
        url: string;
        description: string;
        points: string[];
    } | null): void;
    selectedService: {
        name: string;
        url: string;
        description: string;
        points: string[];
    };
    closeModal(): void;
}

function ModalServiceDescription({ closeModal, selectedService }: modalServiceProps) {
    return (
        <div className={styles.modalBackdrop} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closeModal}>✕</button>
                <h2>{selectedService.name}</h2>
                <Image src={selectedService.url || '/myblog/file.svg'} alt={selectedService.name} width={60} height={60} />
                <p>{selectedService.description}</p>
                <ul>
                    {selectedService.points.map((point, i) =>
                        <li key={i}>{point}</li>)}
                </ul>
            </div>
        </div>
    )
}
