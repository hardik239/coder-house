import React from "react";
import Styles from "./button.module.css";

const Button = ({ text, icon, onClick }) => {
  return (
    <button className={Styles.btn} onClick={onClick}>
      <span>{text}</span>
      <img src={`/images/${icon}.png`} alt={icon} />
    </button>
  );
};

export default Button;
