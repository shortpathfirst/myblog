'use client'

import { Modal, ModalContent } from "./Modal";
import { useState } from "react";
import Image from 'next/image';
type Props = {
    src:string,
    width:number,
    height:number,
    widthContent?:number,
    heightContent?:number,
}
export default function ModalImage({src,width,height,widthContent=600,heightContent=600}:Props) {

    const [isOpen, setIsOpen] = useState(false);
    const showModal = () => setIsOpen((prev) => !prev);

    return (
        <div style={{ "width": "fit-content", "cursor": "pointer" }}>
            <Modal onOpen={showModal}>
                <Image src={src} alt="" width={width} height={height}></Image>
            </Modal>
            {isOpen && (
                <ModalContent onClose={() => setIsOpen(false)}>
                    <Image src={src} alt="" width={widthContent} height={heightContent} onClick={e => e.stopPropagation()}></Image>
                </ModalContent>
            )}
        </div>
    );
}
