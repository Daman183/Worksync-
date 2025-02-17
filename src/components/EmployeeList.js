import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import Employee from "./Employee";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await EmployeeService.getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
        setEmployees([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteEmployee = (e, id) => {
    e.preventDefault();
    EmployeeService.deleteEmployee(id).then(() => {
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id)
      );
    });
  };

  // Filter employees based on search query (ID, First Name, Last Name)
  const filteredEmployees = employees.filter((employee) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      employee.id.toString().includes(lowerCaseQuery) ||
      employee.firstName.toLowerCase().includes(lowerCaseQuery) ||
      employee.lastName.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div className="container mx-auto my-8 px-4">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Employee ID, First Name, or Last Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Employee Id</th>
              <th className="py-3 px-6 text-left">First Name</th>
              <th className="py-3 px-6 text-left">Last Name</th>
              <th className="py-3 px-6 text-left">Email ID</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>

          {/* Show Loading Spinner */}
          {loading ? (
            <tbody>
              <tr>
                <td colSpan="4" className="py-5 text-center text-gray-500">
                  Loading employees...
                </td>
              </tr>
            </tbody>
          ) : filteredEmployees.length > 0 ? (
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <Employee
                  employee={employee}
                  deleteEmployee={deleteEmployee}
                  key={employee.id}
                />
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="4" className="py-5 text-center text-gray-500">
                  No employees found. Add a new employee!
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
