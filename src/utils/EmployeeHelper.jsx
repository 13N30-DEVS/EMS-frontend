import axios from "axios";
import { useNavigate } from "react-router-dom";



export const columns = [
    {
        name: 'S No',
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
        width: "100px"
    },
    {
        name: 'Image',
        selector: (row) => row.profileImage,
        width: "90px"

    },
    {
        name: 'Department',
        selector: (row) => row.dep_name,
        width: "120px"

    },
{
        name: 'DOB',
        selector: (row) => row.dob,
        sortable: true,
        width: "130px"
    },
    {
        name: 'Action',
        selector: (row) => row.action,
        center: "true"
    },
]

export const fetchDepartments = async () => {
    let departments

    try {
        const response = await axios.get('http://localhost:3001/api/department', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.data.success) {
            departments = response.data.departments
        }
    } catch (error) {
        console.error('Error fetching departments:', error);
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
        }
    }
    return departments
};


// employee for salary form

export const getEmployees = async (id) => {
    let employees

    try {
        const response = await axios.get(`http://localhost:3001/api/employee/department/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.data.success) {
            employees = response.data.employees
        }
    } catch (error) {
        console.error('Error fetching departments:', error);
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
        }
    }
    return employees
};


export const EmployeeButtons = ({ Id }) => {
    const navigate = useNavigate()



    return (
        <div className="flex space-x-3">
            <button
                className="px-3 py-1 bg-[#622264] text-white hover:bg-[#7F3F7F]"
                onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
            >
                View
            </button>

            <button
                className="px-3 py-1 bg-green-700 text-white hover:bg-green-800"
                onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
            >
                Edit
            </button>

            <button
                className="px-3 py-1 bg-yellow-600 text-white hover:bg-yellow-500"
                onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
            >
                Salary
            </button>

            <button
                className="px-3 py-1 bg-red-700 text-white hover:bg-red-800"
                onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
            >
                Leave
            </button>


        </div>
    );
};