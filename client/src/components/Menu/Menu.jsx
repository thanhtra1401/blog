import React, { useEffect, useState } from "react";
import styles from "./Menu.module.scss";

import axios from "axios";
import { Link } from "react-router-dom";

export default function Menu({ postMain }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/posts`, {
          params: {
            cat: postMain?.cat,
          },
        });

        setPosts(res.data.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [postMain?.cat]);
  // !cat.isLoading && console.log(cat);
  return (
    <div className={styles.menu}>
      <h1>Other posts you may like</h1>
      {posts.length > 0 &&
        posts.map(
          (post) =>
            post.id !== postMain?.id && (
              <div className={styles.post} key={post.id}>
                <img src={`/upload/${post.img}`} alt={post.id} />
                <h2>{post.title}</h2>
                <Link to={`/post/${post.id}`}>
                  <button>Read more</button>
                </Link>
              </div>
            )
        )}
    </div>
  );
}
