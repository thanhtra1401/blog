import React from "react";
import styles from "./LoginForm.module.scss";
import { Link } from "react-router-dom";
export default function LoginForm() {
  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form}>
        <input className={styles.input} type="text" placeholder="Username" />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
        />
        <button className={styles.btn}>Login</button>
        <span className={styles.error}>This is error!! </span>
        <span className={styles.navigate}>
          You don't have an account?
          <Link className={styles.link} to="/register">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
}
