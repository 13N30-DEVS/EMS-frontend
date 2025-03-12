import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AttendanceReport = () => {
    const [report, setReport] = useState([]);  // Stores the attendance data as an array
    const [limit, setLimit] = useState(5);     // Limit to show first 5 records
    const [skip, setSkip] = useState(0);       // Skip for pagination
    const [dateFilter, setDateFilter] = useState(""); // Date filter value
    const [loading, setLoading] = useState(false); // Loading state

    // Fetch the report data from the API
    const fetchReport = async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams({ limit, skip });
            if (dateFilter) {
                query.append("date", dateFilter); // Append date filter to query
            }

            const response = await axios.get(
                `${API_URL}/attendance/report?${query.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                // If skipping records (i.e., not the first load), append the new data
                if (skip === 0) {
                    setReport(response.data.groupData[dateFilter] || []); // Reset data with new filtered result
                } else {
                    setReport((prevData) => [
                        ...prevData,
                        ...(response.data.groupData[dateFilter] || []),
                    ]);
                }
            }
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            alert(error.message);
            setLoading(false);
        }
    };

    // Fetch report data on page load or when skip or dateFilter changes
    useEffect(() => {
        fetchReport();
    }, [skip, dateFilter]);

    // Load more function for pagination
    const handleLoadmore = () => {
        setSkip((prevSkip) => prevSkip + limit);
    };

    return (
        <div className="min-h-screen p-10 bg-white">
            <h2 className="text-center text-2xl font-bold">Attendance Report</h2>

            {/* Date Filter */}
            <div>
                <h2 className="text-xl font-semibold">Filter by Date</h2>
                <input
                    type="date"
                    className="border bg-gray-100"
                    onChange={(e) => {
                        setDateFilter(e.target.value);
                        setSkip(0); // Reset pagination when the date filter changes
                        setReport([]); // Reset previously fetched data for the new date
                    }}
                />
            </div>

            {/* Loading Indicator */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                // Render the attendance data
                report.length > 0 && (
                    <div className="mt-4 border-b">
                        <h2 className="text-xl font-semibold">
                            {new Date(dateFilter).toLocaleDateString("en-GB")}
                        </h2>

                        <table border="1" cellPadding="10">
                            <thead>
                                <tr>
                                    <th>S No</th>
                                    <th>Employee ID</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {report.map((data, i) => (
                                    <tr key={data.employeeId}>
                                        <td>{i + 1}</td>
                                        <td>{data.employeeId}</td>
                                        <td>{data.employeeName}</td>
                                        <td>{data.departmentName}</td>
                                        <td>{data.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            )}

            {/* Load More Button */}
            <button
                className="px-4 py-2 border bg-gray-100 text-lg font-semibold"
                onClick={handleLoadmore}
            >
                Load More
            </button>
        </div>
    );
};

export default AttendanceReport;
