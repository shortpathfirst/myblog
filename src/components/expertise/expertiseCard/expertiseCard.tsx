import React, { useRef } from "react";
import styles from "./expertisecard.module.css";

export type ExpertiseCardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ title, description, icon }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track mouse position to drive the radial gradient "spotlight"
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; // x within element
    const y = e.clientY - rect.top;  // y within element
    el.style.setProperty("--spot-x", `${x}px`);
    el.style.setProperty("--spot-y", `${y}px`);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    // Fade the spotlight out by moving it off-card
    el.style.setProperty("--spot-x", `-9999px`);
    el.style.setProperty("--spot-y", `-9999px`);
  };

  return (

    <div
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Radial spotlight */}
      <div className={styles.spotlight} aria-hidden />

      <div className={styles.header}>
        {icon && icon}
        <div className={styles.title}>{title}</div>
      </div>

      <div className={styles.description}>{description}</div>
    </div>

  );
};

export default ExpertiseCard;
