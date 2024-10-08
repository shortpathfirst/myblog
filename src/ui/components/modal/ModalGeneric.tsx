'use client'

import { Modal, ModalContent } from "./Modal";
import { useState } from "react";

type Props = {
    children: React.ReactNode,
    img: React.ReactNode,

}
export default function ModalGeneric({children, img }: Props) {

    const [isOpen, setIsOpen] = useState(false);
    const showModal = () => setIsOpen((prev) => !prev);

    return (
        <div style={{ "width": "fit-content", "cursor": "pointer" }}>
            <Modal onOpen={showModal}>
                {img}
            </Modal>
            {isOpen && (
                <ModalContent onClose={() => setIsOpen(false)}>
                    <div onClick={e => e.stopPropagation()}>

                        {children}
                    </div>

                </ModalContent>
            )}
        </div>
    );
}
