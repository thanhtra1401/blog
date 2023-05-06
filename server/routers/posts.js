import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/posts.js";
const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.get("/:id", getPost);
postRouter.post("/", addPost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);

export { postRouter };
