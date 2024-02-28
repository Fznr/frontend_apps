import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDashboard, MdExitToApp } from 'react-icons/md'; // Import icons from react-icons
import './navbar.css'; // Import CSS for styling

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard" className="navbar-item">
          <MdDashboard className="icon" />
          <span>Dashboard</span>
        </Link>
      </div>
      <div className="navbar-menu">
        <Link to="/login" className="navbar-item" onClick={handleLogout}>
          <MdExitToApp className="icon" />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;