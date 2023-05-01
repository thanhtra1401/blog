import React from "react";
import styles from "./PostDetail.module.scss";
import { Link } from "react-router-dom";

export default function PostDetail() {
  return (
    <div className={styles.postDetail}>
      <div className={styles.content}>
        <img
          src="https://static.photocdn.pt/images/articles/2018/12/05/articles/2017_8/beginner_photography_mistakes-1.webp"
          alt="img"
        />
        <div className={styles.postInfo}>
          <div className={styles.user}>
            <img
              src="https://static.photocdn.pt/images/articles/2018/12/05/articles/2017_8/beginner_photography_mistakes-1.webp"
              alt="img"
            />
            <div className={styles.info}>
              <span>Tra</span>
              <p>Posted 2 days ago</p>
            </div>
          </div>
          <div className={styles.edit}>
            <span className={styles.iconEdit}>
              <Link to={`/write?edit=2`} className={styles.link}>
                <i className="fa-solid fa-pen"></i>
              </Link>
            </span>

            <span className={styles.iconDelete}>
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>
        </div>

        <h1>Fernandes tỏa sáng, Man Utd đánh bại Aston Villa</h1>
        <p>
          Man Utd và Aston Villa tạo nên một trận đấu sôi động với nhiều tình
          huống tranh chấp quyết liệt, tuy nhiên cả hai đội bóng đều không tạo
          được nhiều những cơ hội thực sự trước cầu môn của nhau. Đội chủ sân
          Old Trafford kiểm soát bóng 57% thời gian, có 14 lần dứt điểm, 6 lần
          bóng đi trúng khung thành, dẫu vậy chỉ số bàn thắng trông đợi chỉ là
          1,29. Aston Villa có 43% thời gian cầm bóng, chỉ 7 lần dứt điểm, một
          lần bóng đi trúng khung thành và chỉ số bàn thắng trông đợi là 0,49.
          Bàn thắng duy nhất của trận đấu được ghi bởi Fernandes ở phút 39. Cầu
          thủ người Bồ Đào Nha băng vào rất nhanh dứt điểm từ góc hẹp bên phải
          đưa bóng vào lưới sau khi thủ thành Martinez đổ người đẩy cú sút của
          Rashford. Man Utd xứng đáng với bàn thắng bởi họ chơi nhỉnh hơn đội
          khách trong khoảng thời gian dài của hiệp một, trước khi ghi bàn "Quỷ
          đỏ" từng khiến khung thành của Aston Villa sau cú sút dội xà ngang của
          Sancho ở phút 27.
        </p>
      </div>
    </div>
  );
}
