import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdHome, MdPerson, MdSettings, MdPeople } from "react-icons/md";
import "./dashboard.css";

const Dashboard = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);
  return (
    <div className="dashboard-container">
      <div className="menu-container">
        {role !== "Admin" && (
          <Link to="/presence" className="menu-item">
            <div className="menu-box">
              <div className="menu-icon">
                <MdHome />
              </div>
              <span>Presence</span>
            </div>
          </Link>
        )}

        {role !== "Admin" && (
          <Link to="/attendance-summary" className="menu-item">
            <div className="menu-box">
              <div className="menu-icon">
                <MdSettings />
              </div>
              <span>Attendance Summary</span>
            </div>
          </Link>
        )}

        {role !== "Admin" && (
          <Link to="/profile" className="menu-item">
            <div className="menu-box">
              <div className="menu-icon">
                <MdPerson />
              </div>
              <span>Profile</span>
            </div>
          </Link>
        )}

        {role !== "Employee" && (
          <Link to="/employee-attendance-summary" className="menu-item">
            <div className="menu-box">
              <div className="menu-icon">
                <MdSettings />
              </div>
              <span>Employee Attendance Summary</span>
            </div>
          </Link>
        )}

        {role !== "Employee" && (
          <Link to="/employees" className="menu-item">
            <div className="menu-box">
              <div className="menu-icon">
                <MdPeople />
              </div>
              <span>Employees</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
