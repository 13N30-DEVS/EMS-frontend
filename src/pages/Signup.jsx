import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:3001/api/auth/signup", {
        username, 
        email, 
        password
      });
      
      if (response.data.success) {
        // After successful signup, redirect to the login page
        navigate("/login");
      } else {
        setError(response.data.error || "Signup failed! Try again.");
      }
    } catch (error) {
      setError("Server Error");
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-[#622264] from-50% to-gray-100 to-50% space-y-6">
      <h2 className="font-Pacific text-3xl text-white">Employee Management System</h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full px-3 py-2 border"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
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

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="*******"
              className="w-full px-3 py-2 border"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button type="submit" className="w-full bg-[#7F3F7F] hover:bg-[#9B4F9B] text-white py-2">Sign Up</button>
          </div>
        </form>

        {/* Link to Login Page */}
        <div className="mt-4 text-center">
          <span className="text-gray-700">Already have an account? </span>
          <button
            className="text-[#622264] hover:underline"
            onClick={() => navigate('/login')} // Navigate to login page
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
