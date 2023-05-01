import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./Login.module.scss";
export default function Login() {
  return (
    <div className={styles.login}>
      <LoginForm />
    </div>
  );
}
