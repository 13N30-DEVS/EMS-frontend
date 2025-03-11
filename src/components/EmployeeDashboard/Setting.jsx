import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const Setting = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);

    // Function to validate password strength
    const validatePasswordStrength = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        return password.length >= minLength && hasUpperCase && hasNumber;
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords match
        if (setting.newPassword !== setting.confirmPassword) {
            setError("Passwords do not match");
        }
        // Validate password strength
        else if (!validatePasswordStrength(setting.newPassword)) {
            setError("Password must be at least 8 characters long, contain a number, and an uppercase letter");
        }
        else {
            try {
                // Send request to change password
                const response = await axios.put(
                    "http://localhost:3001/api/setting/change-password",
                    setting,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                // Handle successful password change
                if (response.data.success) {
                    navigate("/admin-dashboard/employees");
                    setError(""); // Clear error
                    setSetting({
                        userId: user._id,
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    }); // Reset form fields
                } else {
                    // Handle any errors returned from the server
                    setError(response.data.error || "An unknown error occurred");
                }
            } catch (error) {
                console.error("Error changing password:", error);

                // Check if error response is from the server
                if (error.response) {
                    setError(error.response.data.error || "An unexpected server error occurred");
                } else {
                    setError("Network error or server is down");
                }
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>
            <p className="text-red-500">{error}</p>
            <form onSubmit={handleSubmit}>
                {/* Old Password */}
                <div>
                    <label className="text-sm font-medium text-gray-700">Old Password</label>
                    <input
                        type="password"
                        name="oldPassword"
                        placeholder="Old Password"
                        value={setting.oldPassword}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* New Password */}
                <div>
                    <label className="text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={setting.newPassword}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Confirm New Password */}
                <div>
                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={setting.confirmPassword}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full py-2 px-4 rounded-md bg-[#7F3F7F] hover:bg-[#9B4F9B]  text-white"
                >
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default Setting;
