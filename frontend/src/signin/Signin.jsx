import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate= useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
    e.preventDefault();

    try {
      setError("");
      setMessage("");

      const res = await axios.post(
        "http://localhost:5000/api/reg/login",
        formData,
        { withCredentials: true }
      );
      console.log("the role of a user",res.data)
      const role=res.data.user.role
      if(res.status===200){
        toast.success("user successfully login");
        navigate("/Task",{
          state:role
        });
      }
      setMessage(res.data.message || "Login successful");

    } catch (err) {
      toast.error("user login error")
      setError(
        err.response?.data?.message || "Invalid credentials"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-slate-200">

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-slate-800">
            Welcome Back 👋
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Login to manage your account
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

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 p-3 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 p-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            Sign In
          </button>

        </form>
      </div>
    </div>
  );
};

export default Signin;
