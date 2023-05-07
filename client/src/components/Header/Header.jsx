import React, { useContext } from "react";
import styles from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const toHome = () => {
    navigate("/");
  };
  return (
    <div className={`container ${styles.header}`}>
      <img
        className={styles.logo}
        src="/img/logo.jpg"
        alt="logo"
        onClick={toHome}
      />
      <div className={styles.navbar}>
        <Link to="/?cat=sport" className={styles.link}>
          <h6>SPORT</h6>
        </Link>
        <Link to="/?cat=technology" className={styles.link}>
          <h6>TECHNOLOGY</h6>
        </Link>
        <Link to="/?cat=science" className={styles.link}>
          <h6>SCIENCE</h6>
        </Link>
        <Link to="/?cat=soceity" className={styles.link}>
          <h6>SOCEITY</h6>
        </Link>
        <Link to="/?cat=food" className={styles.link}>
          <h6>FOOD</h6>
        </Link>
        <Link to="/?cat=news" className={styles.link}>
          <h6>NEWS</h6>
        </Link>
        <span className={styles.text}>{currentUser?.username}</span>
        {currentUser ? (
          <span className={styles.text} onClick={logout}>
            Logout
          </span>
        ) : (
          <Link
            to="/login"
            className={styles.text}
            style={{ textDecoration: "none" }}
          >
            Login
          </Link>
        )}

        <span className={styles.write}>
          <Link className={styles.writeLink} to="/write">
            Write
          </Link>
        </span>
      </div>
    </div>
  );
}
