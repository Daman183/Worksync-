import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
  });
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployeeService.getEmployeeById(id);
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]); // Dependency fixed

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const updateEmployee = (e) => {
    e.preventDefault();

    // Basic validation
    if (!employee.firstName || !employee.lastName || !employee.emailId) {
      alert("All fields are required!");
      return;
    }

    EmployeeService.updateEmployee(employee, id)
      .then(() => {
        navigate("/employeeList");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Update Employee
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">
            Loading employee details...
          </p>
        ) : (
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
                onClick={updateEmployee}
                className="w-1/2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all duration-300 mr-2"
              >
                Update
              </button>
              <button
                onClick={() => navigate("/employeeList")}
                className="w-1/2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all duration-300 ml-2"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateEmployee;
