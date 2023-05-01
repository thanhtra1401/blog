import React from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import styles from "./Register.module.scss";
export default function Register() {
  return (
    <div className={styles.register}>
      <RegisterForm />
    </div>
  );
}
