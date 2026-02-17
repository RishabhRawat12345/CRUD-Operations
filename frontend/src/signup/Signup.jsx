import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    console.log("the function is working")
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      console.log("the form resposne",formData)
      const res = await axios.post(
        "http://localhost:5000/api/reg/register",
        formData
      );
 
      setMessage(res.data.message);
      toast.success("user created successfully")
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user"
      });
      navigate("/login");

    } catch (err) {
        toast.error("user registration failed");
      setError(
        err.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-slate-200">

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-slate-800">
            Create your account
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Start managing your resources securely
          </p>
        </div>

        {message && (
          <p className="bg-green-100 text-green-700 text-center p-2 rounded mb-4 text-sm">
            {message}
          </p>
        )}

        {error && (
          <p className="bg-red-100 text-red-700 text-center p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Select Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium p-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>

        </form>

        <p className="text-center text-slate-500 text-sm mt-6">
          Already have an account?{" "}
          <span onClick={()=>navigate("/login")} className="text-blue-600 font-medium cursor-pointer hover:underline">
            Signin
          </span>
        </p>

      </div>
    </div>
  );
};

export default Signup;
