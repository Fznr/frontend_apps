import React, { useState } from 'react';
import './addEmployee.css';

const AddEmployeePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    photo: null,
    phoneNumber: '',
    password: '',
    role: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({
          ...formData,
          photo: reader.result // Simpan base64 ke state
        });
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please fill in all required fields.');
      return;
    }
    // Lakukan logika untuk menyimpan data ke backend
    fetch('http://localhost:3001/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (response.ok) {
        alert('Employee added successfully!');
        // Redirect or do something else upon successful submission
      } else {
        alert('Failed to add employee. Please try again later.');
      }
    })
    .catch(error => console.error('Error adding employee:', error));
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    }
    if (!formData.position.trim()) {
      errors.position = 'Position is required';
      isValid = false;
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
      isValid = false;
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    }
    if (!formData.role.trim()) {
      errors.role = 'Role is required';
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  return (
    <div className="add-employee-container">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} />
          {errors.position && <span className="error">{errors.position}</span>}
        </div>
        {/* Photo input and preview */}
        <div className="form-group">
          <label htmlFor="photo">Photo:</label>
          <input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} />
          {formData.photo && <img src={formData.photo} alt="Preview" className="photo-preview" />}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Employee">Employee</option>
          </select>
          {errors.role && <span className="error">{errors.role}</span>}
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployeePage;
