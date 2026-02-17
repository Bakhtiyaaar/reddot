import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user, logout } = useAuth(); 

  if (!user) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h2>Вы не авторизованы</h2>
          <p>Пожалуйста, войдите в аккаунт, чтобы увидеть профиль.</p>
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
        <button onClick={logout} className="login-btn-blue" style={{background: '#e74c3c'}}>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Profile;