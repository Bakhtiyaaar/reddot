import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      alert("Пароли не совпадают!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          username: formData.nickname,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Регистрация успешна! Теперь войдите в аккаунт.");
        navigate("/login");
      } else {
        alert(data.message || "Ошибка при регистрации");
      }
    } catch (error) {
      alert("Сервер не отвечает");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Регистрация</h2>
        
        <form onSubmit={handleRegister} className="auth-form">
          <div className="input-group">
            <label>E-mail</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group">
            <label>Никнейм</label>
            <input 
              type="text" 
              name="nickname"
              value={formData.nickname}
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

          <div className="input-group">
            <label>Пароль ещё раз</label>
            <input 
              type="password" 
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="captcha-container">
            <div className="captcha-box">
              <input type="checkbox" id="human-check" required />
              <label htmlFor="human-check">Я не робот</label>
            </div>
            <div className="captcha-logo">
              SmartCaptcha <span style={{color: '#999'}}>by Bakhtiyar Cloud</span>
            </div>
          </div>

          <button type="submit" className="login-btn-blue">Зарегистрироваться</button>
        </form>
      </div> 
      <div className="auth-extra-links">
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </div>
    </div>
  );
}

export default Register;
