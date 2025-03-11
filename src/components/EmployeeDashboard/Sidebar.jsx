import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaCog, FaRegCalendarAlt } from "react-icons/fa";
import { useAuth } from "../../context/authContext";


const Sidebar = () => {
  const activeStyle = { backgroundColor: '#9B4F9B ' };
  const { user } = useAuth()

  return (
    <div style={{ backgroundColor: '#622264' }} className="text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">


      <div style={{ backgroundColor: '#622264' }} className="h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-Pacific">Employee MS</h3>
      </div>
      <div>
        <NavLink
          to="/employee-dashboard"
          className="flex items-center space-x-4 block py-2.5 px-4 rounded"
          style={({ isActive }) => isActive ? activeStyle : {}}
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/profile/${user._id}`} // Ensure user._id is correct
          className="flex items-center space-x-4 block py-2.5 px-4 rounded"
          style={({ isActive }) => isActive ? activeStyle : {}}
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>


        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          className="flex items-center space-x-4 block py-2.5 px-4 rounded"
          style={({ isActive }) => isActive ? activeStyle : {}}
        >
          <FaBuilding />
          <span>Leaves</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className="flex items-center space-x-4 block py-2.5 px-4 rounded"
          style={({ isActive }) => isActive ? activeStyle : {}}
        >
          <FaCalendarAlt />
          <span>Salary</span>
        </NavLink>






        <NavLink
          to="/employee-dashboard/settings"
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

export default Sidebar;
