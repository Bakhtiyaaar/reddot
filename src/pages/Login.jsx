import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css"; 

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.email === formData.email && savedUser.password === formData.password) {
      alert(`Добро пожаловать, ${savedUser.username}!`);
      localStorage.setItem("isAuth", "true"); 
      navigate("/"); 
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
              placeholder="example@mail.com"
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
            <div className="captcha-logo">
              SmartCaptcha <span style={{color: '#999'}}>by Bakhtiyar Cloud</span>
            </div>
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

      <footer className="auth-footer-minimal">
        <span>🌐 English</span> 
        <span>О сервисе</span> 
        <span>Обратная связь</span> 
        <span>Соглашение</span>
      </footer>
    </div>
  );
};

export default Login;