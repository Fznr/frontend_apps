import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./presence.css";

const AbsensiPage = () => {
  const [userData, setUserData] = useState(null);
  const [userPresenceData, setUserPresenceData] = useState(null);
  const [arrivalStatus, setArrivalStatus] = useState("Masuk");
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId");

    const fetchUserData = () => {
      fetch(`http://localhost:3002/employees/${employeeId}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data.data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    };

    const fetchUserAttendanceData = () => {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      fetch(
        `http://localhost:3002/${employeeId}/attendance-summary?startDate=${formattedDate}&endDate=${formattedDate}`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user attendance data");
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.length > 0) {
            setUserPresenceData(data[0]);
            setArrivalStatus(data[0].arrivalDate ? "Pulang" : "Masuk");
          }
        })
        .catch((error) =>
          console.error("Error fetching user attendance data:", error)
        );
    };

    if (employeeId) {
      Promise.all([fetchUserData(), fetchUserAttendanceData()]).catch((error) =>
        console.error("Error fetching data:", error)
      );
    }
  }, []);

  const handleSubmit = () => {
    const today = new Date();
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    const seconds = String(today.getSeconds()).padStart(2, "0");
    const timeOnly = `${hours}:${minutes}:${seconds}`;
    const formattedDate = today.toISOString().split("T")[0];
    let body = {
      employeeId: localStorage.getItem("employeeId"),
      arrivalStatus: arrivalStatus,
    };
    if (arrivalStatus === "Masuk" || arrivalStatus === "") {
      body = {
        arrivalDate: formattedDate,
        arrivalTime: timeOnly,
        ...body,
      };
    } else {
      body = {
        arrivalDate: userPresenceData.arrivalDate,
        departureDate: formattedDate,
        departureTime: timeOnly,
        ...body,
      };
    }
    fetch("http://localhost:3002/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/dashboard");
        } else {
          console.error("Error submitting attendance");
        }
      })
      .catch((error) => alert("Error submitting attendance:", error));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absensi-container">
      {userData && (
        <div className="absensi-content">
          <img
            src={`${userData.photo}`}
            alt="User Profile"
            className="profile-img"
          />
          <p className="user-name">Nama: {userData.name}</p>
          <p className="current-time">
            Waktu Sekarang: {currentTime.toLocaleTimeString()}
          </p>
          <select
            value={arrivalStatus}
            onChange={(e) => setArrivalStatus(e.target.value)}
            className="form-control"
          >
            {arrivalStatus === "Pulang" ? (
              <option value="Pulang">Pulang</option>
            ) : (
              <>
                <option value="Masuk">Masuk</option>
                <option value="Pulang">Pulang</option>
              </>
            )}
          </select>
          {userPresenceData && (
            <button
              onClick={handleSubmit}
              className="btn-submit"
              style={{
                display:
                  userPresenceData.departureDate == null ? "block" : "none",
              }}
            >
              Submit
            </button>
          )}
          {userPresenceData == null && (
            <button onClick={handleSubmit} className="btn-submit">
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AbsensiPage;
