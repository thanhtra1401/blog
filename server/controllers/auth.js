import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register
const register = (req, res) => {
  // check exist
  const q = "SELECT * FROM users where email = ? OR username = ?";
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length)
      return res.json({ success: false, message: "User already exists" });
    //hash password

    const myPlaintextPassword = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);

    //create user
    const q = "INSERT INTO users(`username`, `email`, `password`) VALUES(?)";
    const values = [req.body.username, req.body.email, hash];
    db.query(q, [values], (err, data) => {
      if (err) return res.json({ success: false, message: err });
      return res
        .status(200)
        .json({ success: true, message: "User has been created" });
    });
  });
};

//login
const login = (req, res) => {
  const q = "SELECT * FROM users where username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0)
      return res.json({ success: false, message: "User not found" });
    //check password
    const isPassword = bcrypt.compareSync(req.body.password, data[0].password);
    if (!isPassword)
      return res.json({
        success: false,
        message: "Username or password is not correct",
      });
    const token = jwt.sign({ id: data[0].id }, "jwtkey");

    const { password, ...other } = data[0];
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ success: true, user: other });
  });
};

//logout
const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({ success: true, message: "User has been logged out." });
};

//testCookie
const testCookie = (req, res) => {
  res.cookie("token", "testtoken").json(req.body);
};
export { register, login, logout, testCookie };
