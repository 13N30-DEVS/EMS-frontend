import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/DepartmentHelper';
import { DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from "axios";

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [depLoading, setdepLoading] = useState(false);
    const [filteredDepartments, setFilteredDepartments] = useState([])

    const onDepartmentDelete = () => {
        fetchDepartments()

    }

    const fetchDepartments = async () => {
        setdepLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/api/department', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log('Fetched departments:', response.data);
            if (response.data.success) {
                const data = response.data.departments.map((dep, index) => ({
                    _id: dep._id,
                    sno: index + 1,
                    dep_name: dep.dep_name,
                    action: <DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete} />
                }));
                setDepartments(data);
                setFilteredDepartments(data)

            }
        } catch (error) {
            console.error('Error fetching departments:', error);
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        } finally {
            setdepLoading(false);
        }
    };
    useEffect(() => {


        fetchDepartments();
    }, []);

    const filterDepartments = (e) => {
        const records = departments.filter((dep) =>
            dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredDepartments(records)
    }
    return (
        <>{depLoading ? <div>Loading...</div> :
            <div className="p-5">
                <div className="text-center">
                    <h3 className="text-2xl font-bold">Manage Departments</h3>
                </div>
                <div className="flex justify-between items-center">
                    <input type='text' placeholder="Search By Dep Name"
                        className="px-4 py-0.5 border" onChange={filterDepartments} />
                    <Link to="/admin-dashboard/add-department" className="px-4 py-1 bg-[#7F3F7F] hover:bg-[#9B4F9B] rounded text-white">Add New Department</Link>
                </div>
                <div className="mt-5">
                    <DataTable
                        columns={columns} data={filteredDepartments} pagination
                    />
                </div>
            </div>
        }</>
    );
};

export default DepartmentList;
