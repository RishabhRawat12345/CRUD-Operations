import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "../controller/taskController.js";

import { verifyToken } from "../middleware/authMiddleware.js";


const task = express.Router();

task.post("/createT", verifyToken, createTask);


task.get("/getT", verifyToken, getTasks);


task.put("/updatedT/:editTaskId", verifyToken, updateTask);


task.delete("/deleteT/:id", verifyToken, deleteTask);

export default task;
