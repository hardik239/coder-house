import React from "react";
import Styles from "./card.module.css";
import { BsChatDotsFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
const Card = ({ onClick, room }) => {
  console.log(room);
  return (
    <div className={Styles.roomCard} onClick={onClick}>
      <h4 className={Styles.title}>{room.topic}</h4>
      <div className={Styles.body}>
        <div className={Styles.speakersImages}>
          {room.speakers.slice(0, 2).map((speaker) => {
            return <img key={speaker._id} src={speaker.avatar} alt="avatar" />;
          })}
        </div>
        <div className={Styles.speakersList}>
          {room.speakers.slice(0, 2).map((speaker) => {
            return (
              <div className={Styles.speaker} key={speaker._id + "fdxghvj"}>
                <span>{speaker.name}</span>
                <BsChatDotsFill fill="white" />
              </div>
            );
          })}
        </div>
      </div>
      <div className={Styles.footer}>
        <span>{room.speakers.length}</span>
        <FaUserAlt />
      </div>
    </div>
  );
};

export default Card;
