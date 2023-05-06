import express from "express";
import { userRouter } from "./users.js";
import { authRouter } from "./auth.js";
import { postRouter } from "./posts.js";

const rootRouter = express.Router();
rootRouter.use("/users", userRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/posts", postRouter);
export default rootRouter;
