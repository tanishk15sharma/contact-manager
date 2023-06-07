import React from "react";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="bg-gray-100 h-screen p-4 w-1/6	">
      <h3 className="font-semibold my-2">MENU</h3>
      <ul className="ml-3">
        <NavLink to={"/"}>
          <li className="text-gray-700 py-1">Contact Manager</li>
        </NavLink>
        <NavLink to={"/charts"}>
          <li className="text-gray-700 py-1">Charts And Maps</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
