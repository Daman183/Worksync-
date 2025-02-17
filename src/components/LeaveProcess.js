import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LeaveProcess = () => {
  // Extract employeeId from the URL using useParams
  const { employeeId } = useParams();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState(null);

  const applyLeave = () => {
    const payload = {
      startDate: startDate,
      endDate: endDate,
      reason: reason,
    };

    console.log("Employee ID:", employeeId); // Check if employeeId is correct

    // Make sure employeeId is valid before making the request
    if (employeeId) {
      axios
        .post(
          `http://localhost:8082/api/leave-request/${employeeId}`,
          payload,
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          console.log("Leave Request Response:", response);
        })
        .catch((error) => {
          console.error("Error applying leave:", error);
          setError("Error applying leave. Please try again.");
        });
    } else {
      console.log("Invalid employeeId");
      setError("Invalid employee ID.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Request Leave for Employee ID: {employeeId}
      </h2>
      <form className="space-y-6">
        <div className="form-group">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-600"
          >
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-600"
          >
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="reason"
            className="block text-sm font-medium text-gray-600"
          >
            Reason:
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for leave"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="button"
          onClick={applyLeave}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Apply Leave
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default LeaveProcess;
