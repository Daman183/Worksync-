import React from "react";
import { useNavigate } from "react-router-dom";

const Employee = ({ employee, deleteEmployee }) => {
  const navigate = useNavigate();

  const editEmployee = (e, id) => {
    e.preventDefault();
    navigate(`/editEmployee/${id}`);
  };

  const requestLeave = (e, id) => {
    e.preventDefault();
    navigate(`/requestLeave/${id}`); // Navigate to the leave request page
  };

  const handleAttendance = (e, id) => {
    e.preventDefault();
    navigate(`/markAttendance/${id}`); // Navigate to the mark attendance page
  };

  return (
    <tr key={employee.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{employee.id}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{employee.firstName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{employee.lastName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{employee.emailId}</div>
      </td>
      <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-sm">
        <button
          onClick={(e) => editEmployee(e, employee.id)}
          className="text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={(e) => deleteEmployee(e, employee.id)}
          className="text-red-600 hover:text-red-800 px-4 hover:cursor-pointer"
        >
          Delete
        </button>
        <button
          onClick={(e) => requestLeave(e, employee.id)}
          className="text-green-600 hover:text-green-800 px-4 hover:cursor-pointer"
        >
          Request Leave
        </button>
        <button
          onClick={(e) => handleAttendance(e, employee.id)}
          className="text-blue-600 hover:text-blue-800 px-4 hover:cursor-pointer"
        >
          Mark Attendance
        </button>
      </td>
    </tr>
  );
};

export default Employee;
