import React, { useState } from "react";
import Styles from "./authenticate.module.css";
import Phone from "./phone/Phone";
import Email from "./email/Email";
import Otp from "./otp/Otp";

const STEPS = {
  1: Phone,
  2: Email,
  3: Otp,
};

const Authenticate = () => {
  const [step, setStep] = useState(1);

  const StepComponent = STEPS[step];

  if (step === 3) return <StepComponent />;

  return (
    <div className="body-wrapper">
      <div className={Styles.toggleWrapper}>
        <button
          onClick={() => setStep(1)}
          className={step === 1 ? Styles.active : ""}
        >
          <img src="/images/phone-white.png" alt="phone" />
        </button>
        <button
          onClick={() => setStep(2)}
          className={step === 2 ? Styles.active : ""}
        >
          <img src="/images/mail-white.png" alt="email" />
        </button>
      </div>
      <StepComponent onClick={() => setStep(3)} />
    </div>
  );
};

export default Authenticate;
