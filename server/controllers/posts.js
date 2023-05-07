import { db } from "../db.js";
import jwt from "jsonwebtoken";

const getPosts = (req, res) => {
  const q = req.query.cat
    ? "select * from posts where cat = ?"
    : "select * from posts";
  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.send({ success: false, message: err });
    return res
      .status(200)
      .send({ success: true, message: "get posts success", data });
  });
};
const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).send({ success: false, message: err });
    const dataPU = data[0];

    return res
      .status(200)
      .send({ success: true, message: "get post success", dataPU });
  });
};
const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token)
    return res.json({ success: false, message: "Not authenticated!" });

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err)
      return res.json({ success: false, message: "Token is not valid!" });

    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json({ success: false, message: err });
      return res.json({ success: true, message: "Post has been created." });
    });
  });
};
const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.json({ success: false, message: "Not authenticated" });
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.json({ success: false, message: "Token is invalid" });
    const postId = req.params.id;
    const q =
      "update posts set `title` = ?, `desc` = ?, `img` = ?, `cat` = ? where `id`=? and`uid` = ?";
    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];
    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json({ success: false, message: err });
      return res.json({ success: true, message: "Post has been updated." });
    });
  });
};
const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.send({ success: false, message: "Not authenticated" });
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err)
      return res
        .status(403)
        .json({ success: false, message: "Token is not valid!" });
    const postId = req.params.id;

    const q = "delete from posts where `id` = ? and  `uid` = ?";
    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err)
        return res.json({
          success: false,
          message: "You can delete only your post",
        });
      return res.json({ success: true, message: "Post has been deleted" });
    });
  });
};

export { getPost, getPosts, addPost, deletePost, updatePost };
