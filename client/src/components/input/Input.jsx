import React from "react";
import Styles from "./input.module.css";

const Input = ({ className, ...rest }) => {
  return <input className={`${Styles.input} ${className}`} {...rest} />;
};

export default Input;
