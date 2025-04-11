import React, { useState } from "react";
import Card from "./../../card/Card";
import Button from "./../../button/Button";
import Styles from "./name.module.css";
import Input from "./../../input/Input";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Name = ({ onClick, name, setName }) => {
  const [isShowError, setIsShowError] = useState(false);

  const onNext = () => {
    // validate name
    if (name) {
      setIsShowError(false);
      onClick(2);
      return;
    }
    setIsShowError(true);
  };

  return (
    <Card title="What's your full name?" icon="goggle-emoji">
      <div className="inputWrapper">
        <Input
          className={`${Styles.input} ${isShowError ? "error" : ""}`}
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {isShowError && (
          <span className="errorMessage">
            <AiOutlineInfoCircle fontSize={15} fill="red" />
            please enter your name
          </span>
        )}
      </div>
      <p className={Styles.subHeading}>people use's real names at coderhouse</p>
      <Button onClick={onNext} text="Next" icon="arrow-forward" />
    </Card>
  );
};

export default Name;
