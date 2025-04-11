import React from "react";
import styles from "./card.module.css";

const Card = ({ title, icon, children }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardHeader}>
        {icon && <img src={`/images/${icon}.png`} alt={icon} />}
        {title && <span>{title}</span>}
      </div>
      {children}
    </div>
  );
};

export default Card;
