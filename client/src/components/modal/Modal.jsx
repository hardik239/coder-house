import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Input from "../input/Input";
import Styles from "./modal.module.css";
import { createRoom } from "./../../api/index";
import { useNavigate } from "react-router-dom";

const Modal = ({ onClick }) => {
  const [roomType, setRoomType] = useState("globe");
  const [roomTitle, setRoomTitle] = useState("");
  const [isShowError, setIsShowError] = useState(false);

  const navigate = useNavigate();

  const createRoomHandler = async () => {
    try {
      if (!roomTitle) {
        setIsShowError(true);
        return;
      }
      const { data } = await createRoom({ roomTitle, roomType });
      setIsShowError(false);
      navigate(`/room/${data._id}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={Styles.modalWrapper}>
      <div className={Styles.modal}>
        <button className={Styles.close} onClick={onClick}>
          X
        </button>
        <div className={Styles.body}>
          <h3>Enter the topic to be discussed</h3>
          <>
            <Input
              className={`${Styles.input} ${isShowError ? "error" : ""}`}
              type="text"
              placeholder="Your name"
              value={roomTitle}
              onChange={(e) => setRoomTitle(e.target.value)}
            />
            {isShowError && (
              <span className="modalErrorMessage">
                <AiOutlineInfoCircle fontSize={15} fill="red" />
                please enter room title
              </span>
            )}
          </>
          <h5>Room types</h5>
          <div className={Styles.roomTypes}>
            <div
              className={`${Styles.roomType} ${
                roomType === "globe" ? Styles.active : ""
              }`}
              onClick={() => setRoomType("globe")}
            >
              <img src="/images/globe.png" alt="globe" />
              open
            </div>
            <div
              className={`${Styles.roomType} ${
                roomType === "social" ? Styles.active : ""
              }`}
              onClick={() => setRoomType("social")}
            >
              <img src="/images/social.png" alt="social" />
              social
            </div>
            <div
              className={`${Styles.roomType} ${
                roomType === "lock" ? Styles.active : ""
              }`}
              onClick={() => setRoomType("lock")}
            >
              <img src="/images/lock.png" alt="lock" />
              private
            </div>
          </div>
        </div>
        <div className={Styles.footer}>
          <h5>Start a room, open to everyone</h5>
          <button onClick={createRoomHandler}>
            <img src="/images/celebration.png" alt="celebration" />
            <span>Let's go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
