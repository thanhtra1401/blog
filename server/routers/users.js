import express from "express";
import { userTest } from "../controllers/users.js";
const userRouter = express.Router();
userRouter.get("/", userTest);

export { userRouter };
