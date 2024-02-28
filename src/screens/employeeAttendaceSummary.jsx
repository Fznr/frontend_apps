import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './employeeAttendanceSummary.css';

const EmployeeAttendanceSummaryPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [userPresenceData, setUserPresenceData] = useState(null);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = () => {
    if (!startDate && endDate) {
      alert('Please select the start date.');
      return;
    }
    if (startDate && !endDate) {
      alert('Please select the end date.');
      return;
    }
    if (startDate && endDate && startDate > endDate) {
      alert('End date should be after start date.');
      return;
    }
    // Lakukan logika untuk melakukan pencarian berdasarkan startDate dan endDate
    // Misalnya, fetch data dari backend dengan menggunakan startDate dan endDate
    // const employeeId = localStorage.getItem('employeeId');
    const startDateWithOffset = startDate ? new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000) : null;
    const formattedStartDate = startDateWithOffset ? startDateWithOffset.toISOString().split('T')[0] : '';
    const endDateWithOffset = endDate ? new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000) : null;
    const formattedEndDate = endDateWithOffset ? endDateWithOffset.toISOString().split('T')[0] : '';
    
    fetch(`http://localhost:3001/attendances?startDate=${formattedStartDate}&endDate=${formattedEndDate}`, {
      method: 'GET'
    })
    .then(async response => {
      const data = await response.json()
      if (!response.ok) {
        alert(data.message);
      } else {
        setUserPresenceData(data.data);
      }

    })
    .catch(error => console.error('Error fetching user attendance data:', error));
  };


  return (
    <div className="employee-attendance-summary-container">
      <h2>Attendance Summary</h2>
      <div className="filter-section">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText="End Date"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {/* Contoh tabel: */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Masuk</th>
              <th>Pulang</th>
            </tr>
          </thead>
          <tbody>
            {userPresenceData && userPresenceData.map((entry, index) => (
            <tr key={index}>
                <td>{`${entry.Employee.name}`}</td>
                <td>{`${entry.Employee.email}`}</td>
                <td>{`${entry.arrivalDate} ${entry.arrivalTime}`}</td>
                <td>{`${entry.departureDate? entry.departureDate : ''} ${entry.departureTime? entry.departureTime : ''}`}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeAttendanceSummaryPage;
