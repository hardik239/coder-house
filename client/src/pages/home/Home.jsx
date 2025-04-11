import React from "react";
import Card from "../../components/card/Card";
import Styles from "./home.module.css";
import Button from "./../../components/button/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="body-wrapper">
      <Card title="Welcome to Coderhouse!" icon="logo">
        <p className={Styles.subHeading}>
          We're working hard to get Coderhouse ready for everyone! While we wrap
          up the finishing touches. we're adding people gradually to make sure
          noting breaks
        </p>
        <Button
          onClick={() => navigate("/authenticate")}
          text="Get Your Username"
          icon="arrow-forward"
        />
      </Card>
    </div>
  );
};

export default Home;
