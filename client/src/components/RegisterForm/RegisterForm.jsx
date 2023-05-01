import React from "react";
import styles from "./RegisterForm.module.scss";
import { Link } from "react-router-dom";
export default function RegisterForm() {
  return (
    <div className={styles.register}>
      <h1 className={styles.title}>Register</h1>
      <form className={styles.form}>
        <input
          required
          className={styles.input}
          type="text"
          placeholder="Username"
        />
        <input
          required
          className={styles.input}
          type="email"
          placeholder="Email"
        />
        <input
          required
          className={styles.input}
          type="password"
          placeholder="Password"
        />
        <button className={styles.btn}>Register</button>
        <span className={styles.error}>This is error!! </span>
        <span className={styles.navigate}>
          You have an account?
          <Link className={styles.link} to="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}
