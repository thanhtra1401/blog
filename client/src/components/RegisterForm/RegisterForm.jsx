import React, { useState } from "react";
import styles from "./RegisterForm.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
export default function RegisterForm() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});

  const { username, email, password, confirmPassword } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const validateRequire = ({ username, email, password, confirmPassword }) => {
    const err = {};

    if (!username) {
      err.username = "This field is required";
    }
    if (!email) {
      err.email = "This field is required";
    }
    if (!password) {
      err.password = "This field is required";
    }
    if (!confirmPassword) {
      err.confirmPassword = "This field is required";
    }

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError({ ...error, ...validateRequire(inputs) });
      return;
    }
    if (password !== confirmPassword) {
      setError({ ...error, submit: "Password confirm is not correct" });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/register",
        inputs
      );
      if (res.data.success) {
        Swal.fire("Register successfully");
        navigate("/login");
      } else {
        setError({ ...error, submit: res.data.message });
      }
    } catch (error) {
      alert(error);
    }
  };
  // const validateForm =(value) => {
  //   const error = {}
  //   if(value.name)

  // }
  const handleBlur = (e) => {
    if (!e.target.value) {
      setError({ ...error, [e.target.name]: "This field is required" });
      return;
    }
    if (e.target.name === "email" && e.target.value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value))
        return;
      setError({ ...error, [e.target.name]: "This email is not correct" });
    }
    if (e.target.name === "password" && e.target.value) {
      if (/^[0-9a-zA-Z]{8,}$/.test(e.target.value)) return;
      setError({
        ...error,
        [e.target.name]: "Password must contain at least 8 characters",
      });
    }
    if (e.target.name === "confirmPassword" && e.target.value) {
      if (password !== confirmPassword) {
        setError({
          ...error,
          [e.target.name]: "Password confirm is not correct",
        });
        return;
      }
    }
  };
  const handleInput = (e) => {
    if (error[e.target.name]) {
      setError({ ...error, [e.target.name]: "" });
    }
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.title}>Register</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={handleChange}
            onBlur={handleBlur}
            onInput={handleInput}
          />
          {error.username && (
            <span className={styles.error}>{error.username}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            onInput={handleInput}
          />
          {error.email && <span className={styles.error}>{error.email}</span>}
        </div>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            onInput={handleInput}
          />
          {error.password && (
            <span className={styles.error}>{error.password}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={handleChange}
            onBlur={handleBlur}
            onInput={handleInput}
          />
          {error.confirmPassword && (
            <span className={styles.error}>{error.confirmPassword}</span>
          )}
        </div>
        <button className={styles.btn} type="submit">
          Register
        </button>
        <span className={styles.error} style={{ textAlign: "center" }}>
          {error.submit}
        </span>

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
