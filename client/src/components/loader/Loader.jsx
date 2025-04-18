import React from "react";
import Card from "../card/Card";
import Styles from "./loader.module.css";

const Loader = ({ message }) => {
  return (
    <Card>
      <div className={Styles.loaderWrapper}>
        <svg
          className={Styles.spinner}
          width="42"
          height="42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="21" cy="21" r="18" stroke="#C4C5C5" strokeWidth="4" />
          <path
            d="M20.778 1.001A20 20 0 111.542 25.627l3.876-.922a16.016 16.016 0 1015.404-19.72l-.044-3.984z"
            fill="#5453E0"
          />
        </svg>
        <span className={Styles.message}>{message}</span>
      </div>
    </Card>
  );
};

export default Loader;
