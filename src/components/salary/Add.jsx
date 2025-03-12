import React, { useState, useEffect } from "react";
import axios from "axios";
import {fetchDepartments} from '../../utils/EmployeeHelper'
import {useNavigate, useParams} from 'react-router-dom'
import {getEmployees} from '../../utils/EmployeeHelper'

const API_URL = import.meta.env.VITE_API_URL;
const Add = () => {
    const [salary, setSalary] = useState({
        employeeId:'null',
        basicSalary:'0',
        allowances:'0',
        deductions:'0',
        payDate:'null'
    })
    const navigate =  useNavigate()
   const [departments,setDepartments] = useState(null)
   const [employees,setEmployees] = useState([])



    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }
        getDepartments();
    }, [])


const handleDepartment = async (e) =>{
    const emps = await getEmployees(e.target.value)
    setEmployees(emps)
}


    const handleChange = (e) => {
        const { name, value} = e.target
        
        setSalary((prevData) => ({ ...prevData, [name]: value }))

    }

const handleSubmit = async(e) =>{
    e.preventDefault()

    try {
        const response = await axios.post(`${API_URL}/salary/add`, salary, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.data.success) {
            navigate("/admin-dashboard/employees");
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
        }
    }



}

    return (
        <>{departments  ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/*department*/}
                <div >
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <select name="department" onChange={handleDepartment}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required>
                            <option value=''>Select Department</option>
                            {departments.map(dep => (
                                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                            ))}
                        </select>
                    </div>

                        {/*employee*/}
                        <div >
                        <label className="block text-sm font-medium text-gray-700">Employee</label>
                        <select name="employeeId" onChange={handleChange} 
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required>
                            <option value=''>Select Employee</option>
                            {employees.map(emp => (
                                <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                            ))}
                        </select>
                    </div>



                    <div>
                        <label className="block text-sm font-medium text-gray-700">Basic Salary</label>
                        <input type="number" name="basicSalary" onChange={handleChange} placeholder="basic salary"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">Allowances</label>
                        <input type="number" name="allowances" placeholder="allowances" onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required />
                    </div>

                   
                  
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Deductions</label>
                        <input type="number" name="deductions" placeholder="deductions" onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pay Date</label>
                        <input type="date" name="payDate"  onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required />
                    </div>


                </div>

                <button type="submit"
                    className="w-full mt-6 bg-[#7F3F7F] hover:bg-[#9B4F9B] text-white font-bold py-2 px-4 rounded">
                Add Salary</button>
            </form>
        </div>
        ) : <div> Loading</div> }</>
    );
}

export default Add;
