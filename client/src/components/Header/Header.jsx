import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className={`container ${styles.header}`}>
      <img className={styles.logo} src="/img/logo.jpg" alt="logo" />
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
        <span className={styles.text}>Tra</span>
        <span className={styles.text}>Logout</span>
        <span className={styles.write}>
          <Link className={styles.writeLink} to="/write">
            Write
          </Link>
        </span>
      </div>
    </div>
  );
}
