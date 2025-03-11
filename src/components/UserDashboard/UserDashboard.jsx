import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const UserDashboard = () => {
  // Form states stored in a single object
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    query: ''
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    navigate('/login'); // Redirect to login page
  };

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/query/submit', formData);

      if (response.status === 201) {
        // On success
        setSubmittedData(formData);
        setSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', phone: '', query: '' });
        }, 3000);
      }
    } catch (error) {
      setError('Error submitting query. Please try again later.');
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-[#38173A] text-white p-4 flex justify-between items-center shadow-lg">
        <p className="text-xl">Welcome to 13N30 IT Solution</p>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="p-2 bg-[#826d8c] text-white rounded-md hover:bg-[#cac1cf]"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 bg-[#826d8c] text-white flex justify-center items-center">
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-semibold">13N30 IT Solution 🚀</h2>
            <p className="text-lg max-w-xs mx-auto">
              Empowering your business with innovative IT solutions. Get in touch by filling out the form on the right.
            </p>
          </div>
        </div>

        <div className="w-1/2 bg-[#cac1cf] flex justify-center items-center">
          <div className="bg-transparent p-4 rounded-xl shadow-xl max-w-md w-full mt-4">
            {submitted && submittedData ? (
              <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-md">
                <h3 className="font-semibold">Form Submitted Successfully!</h3>
                <p><strong>Name:</strong> {submittedData.name}</p>
                <p><strong>Email:</strong> {submittedData.email}</p>
                <p><strong>Phone:</strong> {submittedData.phone}</p>
                <p><strong>Query:</strong> {submittedData.query}</p>
              </div>
            ) : (
              <div>
                {error && <div className="text-red-500">{error}</div>}
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">User Information</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium text-gray-600">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="p-3 border border-gray-300 rounded-md"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium text-gray-600">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="p-3 border border-gray-300 rounded-md"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-600">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="p-3 border border-gray-300 rounded-md"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Query */}
                  <div className="flex flex-col">
                    <label htmlFor="query" className="text-sm font-medium text-gray-600">Query Message</label>
                    <textarea
                      id="query"
                      name="query"
                      value={formData.query}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="p-3 border border-gray-300 rounded-md"
                      placeholder="Enter your message here"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full p-3 bg-[#2F151F] text-white rounded-md"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
