import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication cookies/session if needed
    toast.success("Logged out successfully");
    navigate("/"); // Redirect to login page
  };

  return (
    <nav className="bg-black text-white px-4 py-3 flex justify-between items-center">
      <h1 className="text-lg font-bold">Task Manager</h1>
      <button
        onClick={handleLogout}
        className="bg-gray-300 text-black px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
