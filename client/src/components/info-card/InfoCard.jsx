import React from "react";
import Styles from "./info-card.module.css";

const InfoCard = ({ imgPath, name, children, client }) => {
  return (
    <div className={Styles.infoCardWrapper}>
      <img src={client?.avatar} alt={client?.name} />
      <span>{client?.name}</span>
      {children}
    </div>
  );
};

export default InfoCard;
