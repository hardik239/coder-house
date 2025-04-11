import React, { useState } from "react";
import Card from "../../card/Card";
import Input from "../../input/Input";
import Button from "../../button/Button";
import Styles from "./email.module.css";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Email = ({ onClick }) => {
  const [email, setEmail] = useState("");
  const [isShowError, setIsShowError] = useState(false);

  const onNext = () => {
    // validate email
    if (!email) {
      setIsShowError(true);
      return;
    }
    onClick();
  };
  return (
    <Card title="Enter your email id" icon="email-emoji">
      <div className="inputWrapper">
        <Input
          type="email"
          placeholder="john@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={isShowError ? "error" : ""}
        />
        {isShowError && (
          <span className="errorMessage">
            <AiOutlineInfoCircle fontSize={15} fill="red" />
            please enter valid email
          </span>
        )}
      </div>
      <Button text="Next" icon="arrow-forward" onClick={onNext} />
      <p className={Styles.info}>
        By entering your email,you're agreeing to out Tearms of Service and
        Privacy Policy, Thanks!
      </p>
    </Card>
  );
};

export default Email;
