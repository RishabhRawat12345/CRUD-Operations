import mongoose from "mongoose";
import Task from "../models/Task.js";


export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = await Task.create({
      title,
      user: req.userId
    });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userid = new mongoose.Types.ObjectId(req.userId);
    const tasks = await Task.find({ user: userid });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

export const updateTask = async (req, res) => {
  const { editTaskId } = req.params;

  if (req.userRole !== "admin") {
    return res.status(401).json({ message: "User is not admin" });
  }

  try {
    const { title } = req.body;
    const task = await Task.findByIdAndUpdate(
      editTaskId,
      { title },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update task" });
  }
};


export const deleteTask = async (req, res) => {
  if (req.userRole !== "admin") {
    return res.status(401).json({ message: "User is not admin" });
  }

  try {
    const { taskid } = req.params;
    const deletedTask = await Task.findByIdAndDelete(taskid);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};
