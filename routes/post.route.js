import express from "express";
import authenticated from "../middlewares/authenticated.js";
import {
  createPost,
  deletePost,
  getPosts,
  myPosts,
} from "../controllers/post.controller.js";
import commentController, {
  getComments,
} from "../controllers/comment.controller.js";
import getLikes, { setLike } from "../controllers/likes.controller.js";
import { FollowingPosts } from "../controllers/followed.controller.js";
const postRoute = express.Router();
postRoute.post("/createpost", authenticated, createPost);
postRoute.get("/getposts", getPosts);
postRoute.post("/comment/:postId", authenticated, commentController);
postRoute.get("/comment/:postId", getComments);
postRoute.get("/:postId/likes", getLikes);
postRoute.post("/:postId/likes", authenticated, setLike);
postRoute.post("/followings", authenticated, FollowingPosts);
postRoute.post("/myposts", authenticated, myPosts);
postRoute.post("/:postId/delete", authenticated, deletePost);
export default postRoute;
