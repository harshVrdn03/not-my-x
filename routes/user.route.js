import express from "express";
import suggestion from "../controllers/suggestion.controller.js";
import authenticated from "../middlewares/authenticated.js";
import followed, {
  getFollowing,
  unfollowed,
} from "../controllers/followed.controller.js";
const userRoute = express.Router();
userRoute.post("/suggestions", authenticated, suggestion);
userRoute.post("/:followingId/followed", authenticated, followed);
userRoute.post("/:followingId/unfollowed", authenticated, unfollowed);
userRoute.post("/following", authenticated, getFollowing);

export default userRoute;
