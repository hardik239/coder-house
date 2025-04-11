import React, { useEffect, useState } from "react";
import Styles from "./room.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdCallEnd } from "react-icons/md";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { FaHandPaper } from "react-icons/fa";
import InfoCard from "../../../components/info-card/InfoCard";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useWebRTC } from "../../../hooks/useWebRTC";
import { getRoom } from "../../../api";

const Room = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const { id: roomId } = useParams();
  const [room, setRoom] = useState(null);

  const { clients, provideRef, handleMute } = useWebRTC(roomId, user);

  const [isMuted, setMuted] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(roomId);
      setRoom(data);
    };

    fetchRoom();
  }, [roomId]);

  useEffect(() => {
    handleMute(isMuted, user.id);
  }, [isMuted]);

  const handManualLeave = () => {
    navigate("/rooms");
  };

  const handleMuteClick = (clientId) => {
    if (clientId !== user.id) {
      return;
    }
    setMuted((prev) => !prev);
  };

  return (
    <div className={Styles.roomWrapper}>
      <div className={Styles.roomHeader}>
        <IoMdArrowRoundBack
          className={Styles.backButton}
          onClick={handManualLeave}
        />
        <h3>All voice rooms</h3>
      </div>
      <div className={Styles.roomBody}>
        <div className={Styles.header}>
          <h3>{room?.topic}</h3>
          <div className={Styles.headerAction}>
            <div
              className={Styles.raiseHand}
              onClick={() => setIsHandRaised(true)}
            >
              🤚
            </div>
            <div className={Styles.leave} onClick={handManualLeave}>
              ✌️
              <span>Leave quietly</span>
            </div>
          </div>
        </div>
        {/* <div className={Styles.speakers}>
          <InfoCard imgPath={user.avatar} name={user.name}>
            <BsFillMicFill className={Styles.mic} />
            <BsFillMicMuteFill className={Styles.mic} />
          </InfoCard>
          <InfoCard imgPath="/images/monkey-avatar.png" name="Adriana">
            <BsFillMicFill className={Styles.mic} />
            <BsFillMicMuteFill className={Styles.mic} />
          </InfoCard>
          <InfoCard imgPath="/images/monkey-avatar.png" name="Adriana">
            <BsFillMicFill className={Styles.mic} />
            <BsFillMicMuteFill className={Styles.mic} />
          </InfoCard>
          <InfoCard imgPath="/images/monkey-avatar.png" name="Adriana">
            <BsFillMicFill className={Styles.mic} />
            <BsFillMicMuteFill className={Styles.mic} />
          </InfoCard>
        </div> */}
        {/* <h5>Other in the room</h5> */}
        <div className={Styles.listners}>
          {clients.map((client) => {
            return (
              <InfoCard
                key={client._id + "gchv"}
                client={client}
                imgPath="/images/monkey-avatar.png"
                name="Adriana"
              >
                {/* {isHandRaised && (
                  <span className={Styles.raisedHand}>
                    <FaHandPaper fontSize={20} fill="yellow" />
                  </span>
                )} */}
                <audio
                  autoPlay
                  ref={(instance) => {
                    provideRef(instance, client.id);
                  }}
                />
                {client.muted ? (
                  <BsFillMicMuteFill
                    onClick={() => handleMuteClick(client.id)}
                    className={Styles.mic}
                  />
                ) : (
                  <BsFillMicFill
                    onClick={() => handleMuteClick(client.id)}
                    className={Styles.mic}
                  />
                )}
              </InfoCard>
            );
          })}
          {clients.length === 0 && <span>No listners in the room yet.</span>}
        </div>
        <div className={Styles.controls}>
          <button
            onClick={() => handleMuteClick(user._id)}
            className={Styles.micBtn}
          >
            {isMuted ? (
              <img src="/images/mic-mute.png" alt="mic" />
            ) : (
              <img src="/images/mic.png" alt="mic" />
            )}
          </button>
          <button className={Styles.callEnd} onClick={handManualLeave}>
            <MdCallEnd />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
