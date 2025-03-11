import axios from "axios";
import React from "react";

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
        name: 'Emp ID',
        selector: (row) => row.employeeId,
        sortable: true,
        width: "100px"
    },
    {
        name:'Department',
        selector:(row) => row.department,
        width:"170px",
    },
    
    {
        name: 'Action',
        selector: (row) => row.action,
       center:'true',
    }
    
];



 export const AttendanceHelper = ({ status, employeeId, statusChange }) => {
    const markEmployee = async (status, employeeId) => {
        console.log('Marking Employee ID:', employeeId);  // Log the employeeId

        try {
            const encodedEmployeeId = encodeURIComponent(employeeId);  // This will encode the `/` character
            const response = await axios.put(`http://localhost:3001/api/attendance/update/${encodedEmployeeId}`, { status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
        
            if (response.data.success) {
                statusChange();
            }
        } catch (error) {
            console.error('Error updating attendance:', error);
            alert('Error updating attendance: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div>
            {status == null ? (
                <div className="flex space-x-8 justify-center">
                    <button className="px-4 py-2 bg-green-600 text-white" aria-label="Mark as Present"
                        onClick={() => markEmployee("Present", employeeId)}>
                        Present
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white" aria-label="Mark as Absent"
                        onClick={() => markEmployee("Absent", employeeId)}>
                        Absent
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white" aria-label="Mark as Sick"
                        onClick={() => markEmployee("Sick", employeeId)}>
                        Sick
                    </button>
                    <button className="px-4 py-2 bg-yellow-600 text-white" aria-label="Mark as Leave"
                        onClick={() => markEmployee("Leave", employeeId)}>
                        Leave
                    </button>
                </div>
            ) : (
                <p className="bg-gray-100 w-20 text-center py-2 rounded">
                    {status}
                </p>
            )}
        </div>
    );
};
