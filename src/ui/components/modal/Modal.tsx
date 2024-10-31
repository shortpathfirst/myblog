import React, { CSSProperties, MouseEventHandler } from "react";

const modal: CSSProperties = {
    position: "fixed",
    zIndex: 10,
    left: 0,
    top: 0,
    width: "100vw",
    height: "100vh",
    overflow: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.8)"
};

const close: CSSProperties = {
    position: "absolute",
    top: 15,
    right: 35,
    color: "#f1f1f1",
    fontSize: 40,
    fontWeight: "bold",
    cursor: "pointer"
};

const modalContent: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",


};

type ModalProps = {
    onOpen: MouseEventHandler;
    children: React.ReactNode;
}

type ModalContentProps = {
    onClose: MouseEventHandler;
    children: React.ReactNode;
}
export const Modal = ({ onOpen, children }: ModalProps) => {
    return <div onClick={onOpen}> {children}</div>;
};

export const ModalContent = ({ onClose, children }: ModalContentProps) => {
    return (
        <div style={modal} onClick={onClose} >
            <span style={close} onClick={onClose}>
                &times;
            </span>
            <div style={modalContent}>{children}</div>
        </div>
    );
};
