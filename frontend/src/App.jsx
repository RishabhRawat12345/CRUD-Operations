import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./signup/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./signin/Signin";
import TasksManager from "./TasksManager/TasksManager";
function App() {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Signin/>} />
        <Route path="/Task" element={<TasksManager/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
