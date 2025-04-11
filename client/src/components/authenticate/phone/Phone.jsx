import React, { useState } from "react";
import Card from "../../card/Card";
import Input from "../../input/Input";
import Button from "../../button/Button";
import Styles from "./phone.module.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { sendOtp } from "../../../api/index";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../store/authSlice";

const Phone = ({ onClick }) => {
  const [phone, setPhone] = useState("");
  const [isShowError, setIsShowError] = useState(false);
  const dispatch = useDispatch();

  const onNext = async () => {
    // validate phone
    if (phone.length === 10) {
      const res = await sendOtp({
        phone,
      });
      if (res.status === 200) {
        onClick();
        setIsShowError(false);
        dispatch(
          setOtp({
            phone: res.data.phone,
            hash: res.data.hash,
          })
        );
        return;
      }
    }
    setIsShowError(true);
  };

  return (
    <Card title="Enter your phone number" icon="phone">
      <div className="inputWrapper">
        <Input
          type="phone"
          placeholder="+91234567857"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          className={isShowError ? "error" : ""}
        />
        {isShowError && (
          <span className="errorMessage">
            <AiOutlineInfoCircle fontSize={15} fill="red" />
            please enter valid phone number
          </span>
        )}
      </div>
      <Button text="Next" icon="arrow-forward" onClick={onNext} />
      <p className={Styles.info}>
        By entering your number,you're agreeing to out Tearms of Service and
        Privacy Policy, Thanks!
      </p>
    </Card>
  );
};

export default Phone;
