import React, { useContext, useEffect, useState } from "react";
import styles from "./PostDetail.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

export default function PostDetail({ setPostToMenu }) {
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [post, setPost] = useState({});
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/posts/${postId}`
        );

        setPost(res.data.dataPU);
        setPostToMenu(res.data.dataPU);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [postId]);
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `http://localhost:8000/api/posts/${postId}`,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (res.data.success) {
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
            navigate("/");
          } else Swal.fire(res.data.message);
        } catch (error) {
          alert(error);
        }
      }
    });
  };

  const showPostAction = () => {
    if (currentUser) {
      return currentUser.username === post.username;
    }
  };
  // useEffect(() => {
  //   setCat({ isLoading: false, cat: post.cat });
  // }, [postId]);
  // console.log(handlegetCat);
  // const handle = (cat) => {
  //   console.log(cat);
  // };

  return (
    <div className={styles.postDetail}>
      <div className={styles.content}>
        <img src={`/upload/${post.img}`} alt={post.title} />
        <div className={styles.postInfo}>
          <div className={styles.user}>
            <img
              src={
                post.userImg ||
                "https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
              }
              alt={post.username}
            />
            <div className={styles.info}>
              <span>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
          </div>

          {showPostAction() && (
            <div className={styles.edit}>
              <span className={styles.iconEdit}>
                <Link to={`/write?edit=2`} className={styles.link} state={post}>
                  <i className="fa-solid fa-pen"></i>
                </Link>
              </span>

              <span className={styles.iconDelete} onClick={handleDelete}>
                <i className="fa-solid fa-trash"></i>
              </span>
            </div>
          )}
        </div>

        <h1>{post.title}</h1>
        <p>{getText(post.desc)}</p>
      </div>
    </div>
  );
}
