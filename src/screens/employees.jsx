import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './employees.css';

const EmployeesPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [employeesData, setEmployeesData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3001/employees?name=${name}&email=${email}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      setEmployeesData(data.data);
    } catch (error) {
      console.error('Error fetching user employees data:', error);
      alert(error.message);
    }
  };

  const handleEditProfile = (index) => {
    const employee = employeesData[index];
    if (employee) {
      const { id } = employee;
      navigate(`/edit-employee/${id}`, { state: { entry: employee } });
    }
  };

  return (
    <div className="employee-attendance-summary-container">
      <h2>Attendance Summary</h2>
      <div className="filter-section">
        <div className="filter-input">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter employee name"
          />
        </div>
        <div className="filter-input">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter employee email"
          />
        </div>
        <button onClick={handleSearch}>Search</button>
        <Link to="/add-new-employee">
          <button>Add</button>
        </Link>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employeesData && employeesData.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>{employee.phoneNumber}</td>
                <td>
                  <button onClick={() => handleEditProfile(index)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesPage;
