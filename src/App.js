import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LeaveRequestForm from "./components/LeaveProcess";
import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";
import Navbar from "./components/Navbar";
import UpdateEmployee from "./components/UpdateEmployee";
import MarkAttendance from "./components/MarkAttendance";
import ViewAttendance from "./components/ViewAttendance";
import LoginPage from "./components/LoginPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Route - Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Default route to login if not authenticated */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/employeeList" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/employeeList"
          element={
            isAuthenticated ? <EmployeeList /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/addEmployee"
          element={isAuthenticated ? <AddEmployee /> : <Navigate to="/login" />}
        />
        <Route
          path="/editEmployee/:id"
          element={
            isAuthenticated ? <UpdateEmployee /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/requestLeave/:employeeId"
          element={
            isAuthenticated ? <LeaveRequestForm /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/markAttendance/:id"
          element={
            isAuthenticated ? <MarkAttendance /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/viewAttendance"
          element={
            isAuthenticated ? <ViewAttendance /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
