import React from "react";
import styles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../api";
import { logout } from "../../store/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLeft} onClick={() => navigate("/")}>
        <img src="/images/logo.png" alt="logo" />
        <span>Coderhouse</span>
      </div>
      {auth && user.activated && (
        <div className={styles.navbarRight}>
          <span>{user.name}</span>
          <img
            className={styles.avatarWrapper}
            src={`${user.avatar || "/images/monkey-avatar.png"}`}
            alt="avatar"
          />
          <button
            onClick={() => {
              signOut();
              dispatch(logout());
              navigate("/");
            }}
          >
            <img src="/images/logout.png" alt="logout" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
