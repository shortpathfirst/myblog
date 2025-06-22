import React from "react";
import styles from "./header.module.css";
import Image from "next/image";

type HeaderProps = {
    backgroundImage: string;
    spanColor?: string;
    children: React.ReactNode;
}

const PageHeader = ({ backgroundImage, spanColor = "#8169eb", children }: HeaderProps) => {
    return (
        <div className={styles.header}>
            <h1 className={styles.h1Title} style={{ '--span-color': spanColor } as React.CSSProperties}>
                {children}
            </h1>
            <Image
                className={styles.background} fill
                src={backgroundImage} alt={"Abstract background"}/>
        </div>
    );
};

export default PageHeader;
