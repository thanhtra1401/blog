import React, { useContext, useState } from "react";
import styles from "./LoginForm.module.scss";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({});

  const { username, password } = inputs;
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handeBlur = (e) => {
    if (!e.target.value) {
      setError({ ...error, [e.target.name]: "This field is require" });
      return;
    }
    if (e.target.name === "password" && e.target.value) {
      if (/^[0-9a-zA-Z]{8,}$/.test(e.target.value)) return;
      setError({
        ...error,
        [e.target.name]: "Password must contain at least 8 characters",
      });
    }
  };
  const handleInput = (e) => {
    if (error[e.target.name]) {
      setError({ ...error, [e.target.name]: "" });
    }
  };
  const checkRequired = ({ username, password }) => {
    const err = {};
    if (!username) {
      err.username = "This field is required";
    }
    if (!password) {
      err.password = "This field is required";
    }
    return err;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError({ ...error, ...checkRequired(inputs) });
      return;
    }
    try {
      const res = await login(inputs);

      if (res.data.success) {
        navigate("/");
      } else {
        setError({ ...error, submit: res.data.message });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            name="username"
            type="text"
            value={username}
            placeholder="Username"
            onChange={handleChange}
            onBlur={handeBlur}
            onInput={handleInput}
          />
          {error.username && (
            <span className={styles.error}>{error.username}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
            onBlur={handeBlur}
            onInput={handleInput}
          />
          {error.password && (
            <span className={styles.error}>{error.password}</span>
          )}
        </div>

        <button className={styles.btn} type="submmit">
          Login
        </button>
        <span className={styles.error} style={{ textAlign: "center" }}>
          {error.submit}
        </span>
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
