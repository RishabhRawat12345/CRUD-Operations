import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import auth from "./router/auth.js";
import task from "./router/taskRoutes.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./Db/Db.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin:' http://localhost:5173',
  credentials: true
}))


connectDB()

app.use("/api/reg",auth);
app.use("/api/task",task)

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port httP://localhost:${PORT}`);
});
