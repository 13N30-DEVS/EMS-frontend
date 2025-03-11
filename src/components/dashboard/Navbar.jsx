import React from "react";
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const { user,logout} = useAuth()
    return (
        <div className="flex items-center text-white justify-between h-12 px-5" style={{ backgroundColor: '#622264' }}>
           <p>Welcome {user.name}</p>
           <button className="px-4 py-1 bg-[#7F3F7F] hover:bg-[#9B4F9B]" onClick={logout}>Logout</button>
           </div> 
    )
}

export default Navbar;

