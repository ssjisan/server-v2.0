import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();

// connect database //
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// middelwares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// router middelware //
// app.use(authRouters);

// Port Information //
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Your are getting data");
});

app.listen(port, () => {
  console.log(`This is running ${port}`);
});