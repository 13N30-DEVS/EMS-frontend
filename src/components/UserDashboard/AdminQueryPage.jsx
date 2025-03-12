import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const AdminQueryPage = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch queries from the backend
  const fetchQueries = async () => {
    try {
      const token = localStorage.getItem('token');  // Assuming the token is stored in localStorage
      if (!token) {
        setError('No token found, please login.');
        setLoading(false);
        return;
      }

      // Include the token in the Authorization header
      const response = await axios.get(`${API_URL}/query/all`, {
        headers: {
          'Authorization': `Bearer ${token}`  // Add the token in Authorization header
        }
      });

      setQueries(response.data.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to load queries');
      setLoading(false);
    }
  };

  // Call fetchQueries when the component mounts
  useEffect(() => {
    fetchQueries();
  }, []);

  if (loading) {
    return <div className="text-center text-xl text-gray-600">Loading queries...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800"> Submitted Queries</h1>
      {queries.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No queries submitted yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black-700">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black-700">Query</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black-700">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((query) => (
                <tr key={query._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{query.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{query.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{query.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{query.query}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(query.submittedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminQueryPage;
