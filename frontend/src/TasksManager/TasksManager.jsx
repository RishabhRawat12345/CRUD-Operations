import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";

const TasksManager = () => {
  const location = useLocation();
  const userRole = location?.state;
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/task/getT", {
        withCredentials: true
      });
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/task/createT",
        { title: newTask },
        { withCredentials: true }
      );
      setTasks([...tasks, res.data]);
      setNewTask("");
      toast.success("Task added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/task/deleteT/${id}`, {
        withCredentials: true
      });
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  const handleEditTask = (task) => {
    setEditTaskId(task._id);
    setEditTaskText(task.title);
  };

  const handleUpdateTask = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/task/updatedT/${editTaskId}`,
        { title: editTaskText },
        { withCredentials: true }
      );
      setTasks(tasks.map((t) => (t._id === editTaskId ? res.data : t)));
      setEditTaskId(null);
      setEditTaskText("");
      toast.success("Task updated successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update task");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="max-w-md mx-auto mt-6 p-4 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-4">Tasks Manager</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task"
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center border p-2 rounded"
            >
              {editTaskId === task._id ? (
                <>
                  <input
                    value={editTaskText}
                    onChange={(e) => setEditTaskText(e.target.value)}
                    className="border p-1 rounded flex-1"
                  />
                  <button
                    onClick={handleUpdateTask}
                    className="bg-green-500 text-white px-2 rounded ml-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditTaskId(null)}
                    className="bg-gray-400 text-white px-2 rounded ml-1"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{task.title}</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="bg-yellow-500 text-white px-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="bg-red-500 text-white px-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TasksManager;
