import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MarkAttendance = () => {
  const { employeeId: paramEmployeeId } = useParams();
  const [employeeId, setEmployeeId] = useState(paramEmployeeId || ""); // Default to URL param or empty
  const [attendanceDate, setAttendanceDate] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState("Present");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleMarkAttendance = () => {
    if (!employeeId || !attendanceDate) {
      setError("Please provide all the details.");
      setSuccess(null);
      return;
    }

    const attendanceRecord = {
      employeeId,
      date: attendanceDate,
      status: attendanceStatus,
    };

    // Retrieve existing attendance records from localStorage
    const existingRecords =
      JSON.parse(localStorage.getItem("attendanceRecords")) || [];

    // Add the new attendance record
    existingRecords.push(attendanceRecord);

    // Store updated records in localStorage
    localStorage.setItem("attendanceRecords", JSON.stringify(existingRecords));

    // Show success message and reset state
    setSuccess("Attendance marked successfully!");
    setError(null);
    navigate("/viewAttendance"); // Navigate to view attendance page
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Mark Attendance {employeeId ? `for Employee ID: ${employeeId}` : ""}
      </h2>

      {/* Manual Employee ID Input */}
      {!paramEmployeeId && (
        <div className="mb-4">
          <label
            htmlFor="employeeId"
            className="block text-sm font-medium text-gray-700"
          >
            Employee ID:
          </label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter Employee ID"
          />
        </div>
      )}

      {/* Attendance Date */}
      <div className="mb-4">
        <label
          htmlFor="attendanceDate"
          className="block text-sm font-medium text-gray-700"
        >
          Date:
        </label>
        <input
          type="date"
          id="attendanceDate"
          value={attendanceDate}
          onChange={(e) => setAttendanceDate(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Attendance Status */}
      <div className="mb-4">
        <label
          htmlFor="attendanceStatus"
          className="block text-sm font-medium text-gray-700"
        >
          Status:
        </label>
        <select
          id="attendanceStatus"
          value={attendanceStatus}
          onChange={(e) => setAttendanceStatus(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Leave">Leave</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleMarkAttendance}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Mark Attendance
      </button>

      {/* Success/Error Message */}
      {success && <p className="mt-4 text-green-500">{success}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default MarkAttendance;
