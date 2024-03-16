import {
  AccessTime,
  Assessment,
  Assignment,
  CalendarMonth,
  Chalet,
  Settings,
} from "@mui/icons-material";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed top-[74px] left-0 h-screen z-[99] w-[170px] text-center border-r border-gray-300 shadow-[0_12px_14px_2px_rgba(0,0,0,0.1)]">
      <ul className="text-start sideMenu pt-10">
        <NavLink to='/' className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }>
          <li className="px-4 text-gray-600 text-lg flex items-center gap-2 py-4 hover:bg-[#f4f3f3] transition duration-300">
            <Assignment /> <span>Task</span>
          </li>
        </NavLink>
        <NavLink to=''>
          <li className="px-4 text-gray-600 text-lg flex items-center gap-2 py-4 hover:bg-[#f4f3f3] transition duration-300">
            <Assessment /> <span>Logs</span>
          </li>
        </NavLink>
        <NavLink to='/attendance'>
        <li className="px-4 text-gray-600 text-lg flex items-center gap-2 py-4 hover:bg-[#f4f3f3] transition duration-300">
          <CalendarMonth /> <span>Attendance</span>
        </li>
        </NavLink>
        <NavLink to='/my-leaves'>
        <li className="px-4 text-gray-600 text-lg flex items-center gap-2 py-4 hover:bg-[#f4f3f3] transition duration-300">
          <Chalet /> <span>Leave</span>
        </li>
        </NavLink>
        <NavLink to=''>
        <li className="px-4 text-gray-600 text-lg flex items-center gap-2 py-4 hover:bg-[#f4f3f3] transition duration-300">
          <Settings /> <span>Setting</span>
        </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
