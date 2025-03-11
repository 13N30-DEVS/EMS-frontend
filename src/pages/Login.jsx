import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", { email, password });
      if (response.data.success) {
        login(response.data.user);
        console.log(response.data.user);
        localStorage.setItem("token", response.data.token);

        // Navigate to the appropriate dashboard based on the user role from the server response
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else if (response.data.user.role === "employee") {
          navigate("/employee-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-[#622264] from-50% to-gray-100 to-50% space-y-6">
      <h2 className="font-Pacific text-3xl text-white">Employee Management System</h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full px-3 py-2 border"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="***"
              className="w-full px-3 py-2 border"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

       

          <div className="mb-4">
            <button type="submit" className="w-full bg-[#7F3F7F] hover:bg-[#9B4F9B] text-white py-2">Login</button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p>Don't have an account? <a href="/signup" className="text-[#622264]">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;