import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const saveEmployee = (e) => {
    e.preventDefault();

    // Basic validation check
    if (!employee.firstName || !employee.lastName || !employee.emailId) {
      alert("All fields are required!");
      return;
    }

    EmployeeService.saveEmployee(employee)
      .then(() => {
        navigate("/employeeList");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setEmployee({ firstName: "", lastName: "", emailId: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Add New Employee
        </h1>

        <form>
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={employee.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter first name"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={employee.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter last name"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="emailId"
              value={employee.emailId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email address"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={saveEmployee}
              className="w-1/2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all duration-300 mr-2"
            >
              Save
            </button>
            <button
              onClick={reset}
              className="w-1/2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all duration-300 ml-2"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
