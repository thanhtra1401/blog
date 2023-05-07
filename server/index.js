import express from "express";
import cors from "cors";
import rootRouter from "./routers/index.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(cookieParser());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const extensionImageList = [".png", ".jpg"];
    const extension = file.originalname.slice(-4);
    const check = extensionImageList.includes(extension);
    if (check) {
      cb(null, true);
    } else {
      cb(new Error("Extension invalid"));
    }
  },
});

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api", rootRouter);
app.listen(8000, () => {
  console.log("Connected");
});
