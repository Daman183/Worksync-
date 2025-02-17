import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to close the dropdown after selecting an option
  const handleDropdownSelect = () => {
    setIsDropdownOpen(false);
  };

  // Function to handle sign-out
  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated"); // Clear the authentication data
    navigate("/login"); // Redirect to login page
  };

  // Determine the page title based on the current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/employeeList":
        return "Dashboard";
      case "/addEmployee":
        return "Add Employee";
      case "/markAttendance/:id":
        return "Attendance";
      case "/requestLeave/:employeeId":
        return "Leave Request";
      default:
        return "";
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-md">
      <div className="h-16 px-8 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center">
          <span className="text-white font-bold text-lg">🚀 WorkSync</span>
        </div>

        {/* Page Title */}
        <div className="text-white text-xl font-semibold">{getPageTitle()}</div>

        {/* Profile Section with Dropdown */}
        <div className="flex items-center space-x-4 relative">
          <img
            src="https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
            onClick={toggleDropdown}
          />

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 bg-white shadow-lg rounded-md mt-2 w-48 z-10 dropdownbtn">
              <ul className="text-gray-800">
                <li>
                  <Link
                    to="/"
                    className="block px-4 py-2 hover:bg-blue-500 hover:text-white"
                    onClick={handleDropdownSelect}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/addEmployee"
                    className="block px-4 py-2 hover:bg-blue-500 hover:text-white"
                    onClick={handleDropdownSelect}
                  >
                    Add Employee
                  </Link>
                </li>
                <li>
                  <Link
                    to="/markAttendance/:id"
                    className="block px-4 py-2 hover:bg-blue-500 hover:text-white"
                    onClick={handleDropdownSelect}
                  >
                    Attendance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/requestLeave/:employeeId"
                    className="block px-4 py-2 hover:bg-blue-500 hover:text-white"
                    onClick={handleDropdownSelect}
                  >
                    Leave Request
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleSignOut();
                      handleDropdownSelect();
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
