import React, { useState } from "react";
import Card from "../../card/Card";
import Button from "../../button/Button";
import Styles from "./otp.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyOtp } from "../../../api";
import { setAuth } from "../../../store/authSlice";

const Otp = () => {
  const [otp, setOtp] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
  });

  const navigate = useNavigate();

  const {
    otp: { phone, hash },
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleOtpChange = (e) => {
    const { name, value } = e.target;

    setOtp((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onNext = async () => {
    let fullOtp = parseInt(
      `${otp.first}${otp.second}${otp.third}${otp.fourth}`
    );
    const res = await verifyOtp({
      phone,
      otp: fullOtp,
      hash,
    });

    if (res.status === 200) {
      dispatch(
        setAuth({
          user: res.data.user,
          auth: res.data.auth,
        })
      );
      navigate("/activate");
    }
  };

  const handleAutoFocus = (e) => {
    const target = e.srcElement || e.target;
    const maxLength = parseInt(target.attributes["maxlength"].value, 10);
    const myLength = target.value.length;
    if (myLength >= maxLength) {
      let next = target;
      while ((next = next.nextElementSibling)) {
        if (next == null) break;
        if (next.tagName.toLowerCase() === "input") {
          next.focus();
          break;
        }
      }
    }
    // Move to previous field if empty (user pressed backspace)
    else if (myLength === 0) {
      let previous = target;
      while ((previous = previous.previousElementSibling)) {
        if (previous == null) break;
        if (previous.tagName.toLowerCase() === "input") {
          previous.focus();
          break;
        }
      }
    }
  };

  return (
    <div className="body-wrapper">
      <Card title="Enter the code we just sent you" icon="lock-emoji">
        <div onKeyUp={handleAutoFocus}>
          <input
            name="first"
            value={otp.first}
            onChange={handleOtpChange}
            className={Styles.optInput}
            maxLength="1"
            autoFocus={true}
          />
          <input
            name="second"
            value={otp.second}
            onChange={handleOtpChange}
            className={Styles.optInput}
            maxLength="1"
          />
          <input
            name="third"
            value={otp.third}
            onChange={handleOtpChange}
            className={Styles.optInput}
            maxLength="1"
          />
          <input
            name="fourth"
            value={otp.fourth}
            onChange={handleOtpChange}
            className={Styles.optInput}
            maxLength="1"
          />
        </div>
        <p className={Styles.subHeading}>Didn't receive? Tap to resend</p>
        <Button onClick={onNext} text="Next" icon="arrow-forward" />
      </Card>
    </div>
  );
};

export default Otp;
