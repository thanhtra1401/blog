import React, { useState } from "react";
import styles from "./AddPost.module.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

export default function AddPost() {
  const state = useLocation().state;
  const navigate = useNavigate();

  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);

  const [cat, setCat] = useState(state?.cat || "");

  const upload = async () => {
    try {
      const formData = new FormData();

      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:8000/api/upload",
        formData
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  // const upload = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     //const res = await axios.post("http://localhost:8000/api/upload");
  //     console.log(formData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      state
        ? await axios.put(
            `http://localhost:8000/api/posts/${state.id}`,
            {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
            },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
        : await axios.post(
            `http://localhost:8000/api/posts`,
            {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };

  return (
    <div className={`container ${styles.add}`}>
      <div className={styles.content}>
        <input
          value={title}
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className={styles.editorContainer}>
          <ReactQuill
            className={styles.editor}
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className={styles.menu}>
        <div className={styles.item}>
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <label className={styles.file} htmlFor="file">
            Upload image
          </label>
          <div className={styles.buttons}>
            <button className={styles.button}>Save as a draft</button>
            <button className={styles.button} onClick={handleClick}>
              Publish
            </button>
          </div>
        </div>
        <div className={styles.item}>
          <h1>Category</h1>
          <div className={styles.cat}>
            <input
              type="radio"
              checked={cat === "sport"}
              name="cat"
              value="sport"
              id="sport"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="sport">Sport</label>
          </div>
          <div className={styles.cat}>
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className={styles.cat}>
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className={styles.cat}>
            <input
              type="radio"
              checked={cat === "society"}
              name="cat"
              value="society"
              id="society"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="society">Society</label>
          </div>
          <div className={styles.cat}>
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
          <div className={styles.cat}>
            <input
              type="radio"
              checked={cat === "news"}
              name="cat"
              value="news"
              id="news"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="news">News</label>
          </div>
        </div>
      </div>
    </div>
  );
}
