import React, { useEffect, useState } from "react";
import styles from "./Posts.module.scss";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function Posts() {
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const cat = location.search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/posts${cat}`);
        setPosts(res.data.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [cat]);
  //public/upload/16834441468043-15813821097511476102698.jpg
  return (
    <div className="container">
      <div className={styles.posts}>
        {posts.map((post) => (
          <div className={styles.post} key={post.id}>
            <div className={styles.img}>
              <img src={`/upload/${post.img}`} alt={post.title} />
            </div>
            <div className={styles.content}>
              <Link className={styles.link} to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <Link to={`/post/${post.id}`}>
                <button>Read more</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
