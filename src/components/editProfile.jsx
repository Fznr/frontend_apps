import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './editProfile.css';

const EditProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = location.state ?? {};
  const [formData, setFormData] = useState({
    phoneNumber: userData.phoneNumber || '',
    oldPassword: null,
    password: null,
    photo: userData.photo // Tambahkan photo dari userData untuk preview existing photo
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Mengatur preview photo baru saat memilih file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({
          ...formData,
          photo: reader.result
        });
      };
    }
  };

  const handleSubmit = (e) => {
    const employeeId = localStorage.getItem('employeeId');
    e.preventDefault();
    let payload = formData;
    if (!payload.oldPassword) {
      payload = {
        phoneNumber: formData.phoneNumber,
        photo: formData.photo
      };
    }
    fetch(`http://localhost:3002/employees/${employeeId}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(async response => {
      if (response.ok) {
        alert("success");
        navigate('/profile');
      } else {
        const data = await response.json();
        alert(data.message);
      }
    })
    .catch(error => alert('Error updating profile:', error));
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="edit-profile-container">
      <div className='edit-profile-content'>
        <div>
          <h2 style={{ display: "block", textAlign: 'center' }}>Edit Profil</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit} className='edit-form-content'>
            <div className="edit-profile-form-group" style={{ marginTop: '5px' }}>
              <div>
                <label>Nomor Telepon</label>
              </div>
              <div>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
              </div>
            </div>
            <div className="edit-profile-form-group" style={{ marginTop: '5px' }}>
              <div>
                <label>Password Lama</label>
              </div>
              <div>
                <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} />
              </div>
            </div>
            <div className="edit-profile-form-group" style={{ marginTop: '5px' }}>
              <div>
                <label>Password Baru</label>
              </div>
              <div>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
              </div>
            </div>
            <div className="edit-profile-form-group">
              <label htmlFor="photo">Photo:</label>
              <input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} />
              {formData.photo && <img src={formData.photo} alt="Preview" className="photo-preview" />}
            </div>
            <button type="submit" style={{ marginTop: '5px' }}>Simpan</button>
            <button type="button" onClick={handleCancel} style={{ marginTop: '5px' }}>Batal</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
