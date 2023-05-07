import React, { useState } from "react";
import PostDetail from "./../../components/PostDetail/PostDetail";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Menu from "../../components/Menu/Menu";
import styles from "./Single.module.scss";
export default function Single() {
  const [post, setPost] = useState(null);

  return (
    <div>
      <Header />
      <div className={`${styles.single} container `}>
        <div className={styles.postDetail}>
          <PostDetail setPostToMenu={setPost} />
        </div>
        <div className={styles.menu}>
          <Menu postMain={post} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
