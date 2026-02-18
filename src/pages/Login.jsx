import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css"; 
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const getUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || []; 
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = getUsers(); 

    const foundUser = users.find(
      (user) => user.email === formData.email && user.password === formData.password
    );

    if (foundUser) {
      login(foundUser); 
      navigate("/profile"); 
    } else {
      alert("Неверный email или пароль");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Вход</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="captcha-container">
            <div className="captcha-box">
              <input type="checkbox" id="robot-check" required />
              <label htmlFor="robot-check">Я не робот</label>
            </div>
            <div className="captcha-logo">SmartCaptcha <span>by Bakhtiyar Cloud</span></div>
          </div>
          <button type="submit" className="login-btn-blue">Войти</button>
        </form>
        <div className="auth-links-center">
          <Link to="/recovery" className="forgot-password">Забыли пароль?</Link>
        </div>
      </div>
      <div className="auth-extra-links">
        Ещё нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
      </div>
    </div>
  );
};

export default Login;
