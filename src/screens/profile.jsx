import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa'; // Import ikon pensil dari react-icons
import './profile.css';
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const employeeId = localStorage.getItem('employeeId');
        const response = await fetch(`http://localhost:3002/employees/${employeeId}`); // Ganti URL dengan URL endpoint yang sesuai
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    navigate('/profile/edit-profile', { state: { userData } });
  };
  return (
    <div className="profile-container">
      {userData && (
        <div className='profile-content'>
          <div className="profile-photo">
            <img src={`${userData.photo}`} alt="User Profile" className="profile-img" />
            <button className="edit-button" onClick={handleEditProfile}>
              <FaEdit />
              <span className="edit-text">Edit Profil</span>
            </button>
          </div>
          <div className="profile-details">
            <p>Nama: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>Posisi: {userData.position}</p>
            <p>Nomor Telepon: {userData.phoneNumber}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
