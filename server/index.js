import express from "express";
import cors from "cors";
import rootRouter from "./routers/index.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api", rootRouter);
app.listen(8000, () => {
  console.log("Connected");
});
