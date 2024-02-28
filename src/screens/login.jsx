import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("accessToken", data.data.password);
        localStorage.setItem("employeeId", data.data.id);
        localStorage.setItem("role", data.data.role);
        navigate("/dashboard");
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("error : ", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="background">
      <div className="login">
        <h4>Login</h4>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <div className="text_area">
              <input
                type="text"
                id="email"
                name="email"
                className="text_input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <label>Password:</label>
          <div className="text_area">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="text_input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-toggle-button"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
