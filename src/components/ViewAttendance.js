import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewAttendance = () => {
  const { employeeId } = useParams(); // Get employeeId from URL
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    // Retrieve all attendance records from localStorage
    const records = JSON.parse(localStorage.getItem("attendanceRecords")) || [];

    // Filter records by employeeId
    const filteredRecords = records.filter(
      (record) => record.employeeId === employeeId
    );
    setAttendanceRecords(filteredRecords);
  }, [employeeId]); // Re-run when employeeId changes

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Attendance Records for Employee ID: {employeeId}
      </h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Employee ID</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.length > 0 ? (
            attendanceRecords.map((record, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{record.employeeId}</td>
                <td className="px-4 py-2 border">{record.date}</td>
                <td className="px-4 py-2 border">{record.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-4 py-2 border text-center">
                No attendance records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAttendance;
