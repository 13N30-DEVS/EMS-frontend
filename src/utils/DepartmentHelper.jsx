import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const columns = [
    {
        name: 'S No',
        selector: (row) => row.sno
    },
    {
        name: 'Department Name',
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: 'Action',
        selector: (row) => row.action
    },
]

export const DepartmentButtons = ({ Id, onDepartmentDelete }) => {
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        const confrim = window.confirm("Do you want to delete?")
        if (confrim) {
            try {

                const response = await axios.delete(`${API_URL}/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    onDepartmentDelete()
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        }
    }

    return (
        <div className="flex space-x-3">
            <button
                className="px-3 py-1 bg-green-700 text-white hover:bg-green-600"
                onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
            >
                Edit
            </button>
            <button
                className="px-3 py-1 bg-red-700 text-white hover:bg-red-600"
                onClick={() => handleDelete(Id)}
            >
                Delete
            </button>
        </div>

    );
};
