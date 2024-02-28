import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screens/login.jsx';
import Dashboard from './screens/dashboard.jsx';
import Presence from './screens/presence.jsx';
import PrivateRoute from './components/privateRoute.jsx';
import ProfilePage from './screens/profile.jsx';
import EditProfilePage from './components/editProfile.jsx';
import AttendanceSummaryPage from './screens/attendaceSummary.jsx';
import Navbar from './components/navbar.jsx';
import EmployeeAttendanceSummaryPage from './screens/employeeAttendaceSummary.jsx';
import EmployeesPage from './screens/employees.jsx';
import AddEmployeePage from './components/addEmployee.jsx';
import EditEmployeePage from './components/editEmployee.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Dashboard />} path="/" exact />
            <Route element={<Dashboard />} path="/dashboard" exact />
            <Route element={<Presence />} path="/presence" exact />
            <Route element={<ProfilePage />} path="/profile" exact />
            <Route element={<EditProfilePage />} path="/profile/edit-profile" exact />
            <Route element={<AttendanceSummaryPage />} path="/attendance-summary" exact />
            <Route element={<EmployeeAttendanceSummaryPage />} path="/employee-attendance-summary" exact />
            <Route element={<EmployeesPage />} path="/employees" exact />
            <Route element={<AddEmployeePage />} path="/add-new-employee" exact />
            <Route element={<EditEmployeePage />} path="/edit-employee/:id" exact />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
