import express from "express";
import { login, logout, register, testCookie } from "../controllers/auth.js";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.post("/", testCookie);
export { authRouter };
