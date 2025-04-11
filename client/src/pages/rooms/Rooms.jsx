import React, { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";
import Card from "./Card/Card";
import Styles from "./rooms.module.css";
import { useNavigate } from "react-router-dom";
import { getAllRooms } from "../../api";

const Rooms = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await getAllRooms();
      setRooms(data);
    };
    fetchRooms();
  }, []);

  return (
    <div className={Styles.roomsWrapper}>
      <div className={Styles.roomActions}>
        <div className={Styles.roomActionLeft}>
          <h3>All voice rooms</h3>
          <div className={Styles.searchWrapper}>
            <img src="/images/search-icon.png" alt="" />
            <input type="text" name="" id="" />
          </div>
        </div>
        <button onClick={() => setIsModalOpen(!isModalOpen)}>
          <img src="/images/add-room-icon.png" alt="" />
          <span>Start a room</span>
        </button>
      </div>
      <div className={Styles.rooms}>
        {rooms.map((room) => {
          return (
            <Card
              key={room._id}
              room={room}
              onClick={() => navigate(`/room/${room._id}`)}
            />
          );
        })}
      </div>
      {rooms.length === 0 && (
        <span className={Styles.emptyMsg}>
          No rooms are created yet.
          <br /> You can create room by clicking start a room
        </span>
      )}
      {isModalOpen && <Modal onClick={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Rooms;
