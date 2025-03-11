import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaBuilding, FaCalendarAlt, FaComments,FaMoneyBillWave, FaCogs,FaRegCalendarAlt } from "react-icons/fa";
import {AiOutlineFileText} from 'react-icons/ai'

const AdminSidebar = () => {
  const activeStyle = { backgroundColor: '#9B4F9B ' }; 

  return (
<div style={{ backgroundColor: '#622264' }} className="text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
  

      <div style={{ backgroundColor: '#622264' }} className="h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-Pacific">Employee MS</h3>
      </div>
      <div>
        <NavLink
          to="/admin-dashboard"
          className="flex items-center space-x-4 block py-2.5 px-4 rounded"
          style={({ isActive }) => isActive ? activeStyle : {}}
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/employees"
          className="flex items-center space-x-4 block py-2.5 px-4 rounded"
          style={({ isActive }) => isActive ? activeStyle : {}}
        >
          <FaUsers />
          <span>Employee</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/departments"
          className="flex items-center space-x-4 block py-2.5 px-4 rounded"
          style={({ isActive }) => isActive ? activeStyle : {}}
        >
          <FaBuilding />
          <span>Department</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/leaves"
          className="flex items-center space-x-4 block py-2.5 px-4 rounded"
          style={({ isActive }) => isActive ? activeStyle : {}}
        >
          <FaCalendarAlt />
          <span>Leave</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/salary/add"
          className="flex items-center space-x-4 block py-2.5 px-4 rounded"
          style={({ isActive }) => isActive ? activeStyle : {}}
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>

    <NavLink
           to={`/admin-dashboard/attendance`}  
           className="flex items-center space-x-4 block py-2.5 px-4 rounded"
           style={({ isActive }) => isActive ? activeStyle : {}}
         >
           <FaRegCalendarAlt />
           <span>Attendance</span>
         </NavLink>
 
         <NavLink
           to={`/admin-dashboard/attendance-report`}  
           className="flex items-center space-x-4 block py-2.5 px-4 rounded"
           style={({ isActive }) => isActive ? activeStyle : {}}
         >
           <AiOutlineFileText />
           <span>Attendance Report</span>
         </NavLink>


<NavLink
  to="/admin-dashboard/queries"
  className="flex items-center space-x-4 block py-2.5 px-4 rounded"
  style={({ isActive }) => isActive ? activeStyle : {}}
>
  <FaComments />
  <span>Queries</span>
</NavLink>



        <NavLink
          to="/admin-dashboard/settings"
          className="flex items-center space-x-4 block py-2.5 px-4 rounded"
          style={({ isActive }) => isActive ? activeStyle : {}}
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
