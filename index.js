import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/user", userRoute);
app.listen(process.env.PORT, () => {
  console.log(`database is connected at ${process.env.PORT}`);
});
