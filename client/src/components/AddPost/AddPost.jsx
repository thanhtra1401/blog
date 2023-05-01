import React, { useState } from "react";
import styles from "./AddPost.module.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function AddPost() {
  const [value, setValue] = useState("");
  return (
    <div className={`container ${styles.add}`}>
      <div className={styles.content}>
        <input type="text" placeholder="Title" />
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
          <input style={{ display: "none" }} type="file" id="file" name="" />
          <label className={styles.file} htmlFor="file">
            Upload image
          </label>
          <div className={styles.buttons}>
            <button className={styles.button}>Save as a draft</button>
            <button className={styles.button}>Publish</button>
          </div>
        </div>
        <div className={styles.item}>
          <h1>Category</h1>
          <div className={styles.cat}>
            <input type="radio" name="cat" value="sport" id="sport" />
            <label htmlFor="sport">Sport</label>
          </div>
          <div className={styles.cat}>
            <input type="radio" name="cat" value="technology" id="technology" />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className={styles.cat}>
            <input type="radio" name="cat" value="science" id="science" />
            <label htmlFor="science">Science</label>
          </div>
          <div className={styles.cat}>
            <input type="radio" name="cat" value="society" id="society" />
            <label htmlFor="society">Society</label>
          </div>
          <div className={styles.cat}>
            <input type="radio" name="cat" value="food" id="food" />
            <label htmlFor="food">Food</label>
          </div>
          <div className={styles.cat}>
            <input type="radio" name="cat" value="News" id="News" />
            <label htmlFor="News">News</label>
          </div>
        </div>
      </div>
    </div>
  );
}
