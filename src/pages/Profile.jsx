import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom"; 

const Profile = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  if (!user) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h2>Вы не авторизованы</h2>
          <p>Пожалуйста, войдите в аккаунт, чтобы увидеть профиль.</p>
          <button onClick={() => navigate("/login")} className="login-btn-blue">Войти</button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Мой профиль</h2>
        <div className="profile-info">
          <p><strong>Никнейм:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <button onClick={handleLogout} className="login-btn-blue" style={{background: '#e74c3c'}}>
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
};

export default Profile;