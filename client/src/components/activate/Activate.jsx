import React, { useState } from "react";
import Name from "./name/Name";
import Avatar from "./avatar/Avatar";
// import Loader from "./../loader/Loader";

const STEPS = {
  1: Name,
  2: Avatar,
};

const Activate = () => {
  const [name, setName] = useState("");
  const [step, setStep] = useState(1);

  const StepComponent = STEPS[step];

  return (
    <div className="body-wrapper">
      {/* <Loader message="Activation in progress..." /> */}
      <StepComponent name={name} setName={setName} onClick={setStep} />
    </div>
  );
};

export default Activate;
