import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;
const List = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filteredEmployee, SetfilteredEmployees] = useState([]);

    useEffect(() => {
        
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get(`${API_URL}/employee`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    const data = response.data.employees.map((emp, index) => ({
                        _id: emp._id,
                        sno: index + 1,
                        dep_name: emp.department.dep_name,
                        name: emp.userId.name,
                        dob: new Date(emp.dob).toLocaleDateString(),
                        profileImage: (
                            <img 
                                width={40} 
                                className="rounded-full" 
                                src={`${API_URL}/uploads/${emp.userId.profileImage}`}
                                alt="User profile" 
                            />
                        ),
                        action: <EmployeeButtons Id={emp._id} />
                    }));
                    setEmployees(data);
                    SetfilteredEmployees(data);
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
                if (error.response && error.response.data.error) {
                    alert(error.response.data.error);
                } else {
                    alert('Something went wrong. Please try again later.');
                }
            } finally {
                setEmpLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleFilter = (e) => {
        const filterValue = e.target.value.toLowerCase();
        const filtered = employees.filter((emp) =>
            emp.name.toLowerCase().includes(filterValue)
        );
        SetfilteredEmployees(filtered);
    };

    if (empLoading) {
        return <div>Loading employees...</div>;
    }

    return (
        <div className="p-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Employee</h3>
            </div>
            <div className="flex justify-between items-center">
                <input 
                    type="text" 
                    placeholder="Search By Employee Name"
                    className="px-4 py-0.5 border" 
                    onChange={handleFilter} 
                />
                <Link 
                    to="/admin-dashboard/add-employee"
                    className="px-4 py-1 bg-[#7F3F7F] hover:bg-[#9B4F9B] rounded text-white"
                >
                    Add New Employee
                </Link>
            </div>
            <div className="mt-5">
                <DataTable 
                    columns={columns} 
                    data={filteredEmployee} 
                    pagination 
                    paginationPerPage={5}  // Number of rows per page
                    paginationComponentOptions={{
                        rowsPerPageText: 'Rows per page:', 
                        rangeSeparatorText: 'of',
                        selectAllRowsItem: true,
                        selectAllRowsItemText: 'All',
                    }}
                />
            </div>
        </div>
    );
};

export default List;
