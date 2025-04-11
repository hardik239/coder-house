import React, { useEffect, useState } from "react";
import Button from "../../button/Button";
import Card from "../../card/Card";
import Styles from "./avatar.module.css";
import { activate } from "./../../../api/index";
import Loader from "./../../loader/Loader";
import { setAuth } from "../../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Avatar = ({ name }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [profileImg, setProfileImg] = useState("/images/monkey-avatar.png");

  const imagePathToDataURL = async (image) => {
    const response = await fetch(image);
    const blob = await response.blob();
    const file = new File([blob], "image.jpg", { type: blob.type });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setProfileImg(reader.result);
    };
  };

  useEffect(() => {
    if (user.avatar) setProfileImg(user.avatar);
    else imagePathToDataURL("/images/monkey-avatar.png");
  }, []);

  const dispatch = useDispatch();

  const changeProfileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setProfileImg(reader.result);
    };
  };

  async function submit() {
    setIsLoading(true);
    try {
      const { data } = await activate({ name, avatar: profileImg });
      if (data.auth) {
        dispatch(setAuth(data));
        navigate("/rooms");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <Loader message="Activation in progress..." />;

  return (
    <Card title={`Okay,${name}!`} icon="monkey-emoji">
      <p className={Styles.subHeading}>How's this photo?</p>
      <div className={Styles.previewImage}>
        <img src={profileImg} alt="avatar" />
      </div>
      <input
        className={Styles.input}
        type="file"
        hidden
        onChange={changeProfileHandler}
        id="avatar"
        accept="image/png, image/jpeg"
      />
      <label htmlFor="avatar" className={Styles.label}>
        Choose a different photo
      </label>
      <Button onClick={submit} text="Next" icon="arrow-forward" />
    </Card>
  );
};

export default Avatar;
