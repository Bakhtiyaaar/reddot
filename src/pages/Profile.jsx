import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom"; 

const Profile = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchUserPosts = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/posts?author=${user.username}`);
          const data = await response.json();
          setUserPosts(data);
          setLoading(false);
        } catch (err) {
          console.error("Ошибка при загрузке постов:", err);
          setLoading(false);
        }
      };
      fetchUserPosts();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  if (!user) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h2 className="auth-title">Вы не авторизованы</h2>
          <p>Пожалуйста, войдите в аккаунт.</p>
          <button onClick={() => navigate("/login")} className="login-btn-blue">Войти</button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card profile-card">
        <h2 className="auth-title">Мой профиль</h2>
        
        <div className="profile-header">
          <div className="profile-avatar">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info-text">
            <p><strong>{user.username}</strong></p>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-section">
          <h3>Мои вопросы ({userPosts.length})</h3>
          {loading ? (
            <p className="empty-text">Загрузка публикаций...</p>
          ) : userPosts.length > 0 ? (
            <ul className="profile-post-list">
              {userPosts.map((post) => (
                <li key={post._id} className="profile-post-item">
                  <Link to={`/post/${post._id}`} className="post-link">
                    {post.title}
                  </Link>
                  <span className="post-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-text">Вы еще не создали ни одного вопроса.</p>
          )}
        </div>

        <div className="profile-section">
          <h3>Мои сообщества ({user?.communities?.length || 0})</h3>
          {user?.communities?.length > 0 ? (
            <ul className="profile-post-list">
              {user.communities.map(id => {
                const names = { 1: "Разработка", 2: "Дизайн", 3: "Администрирование", 4: "Маркетинг" };
                return (
                  <li key={id} className="profile-post-item">
                    <span className="post-link">{names[id] || "Сообщество"}</span>
                    <span className="post-date">Вы подписаны</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="empty-text">Вы пока не подписаны на сообщества.</p>
          )}
        </div>

        <button onClick={handleLogout} className="logout-btn-red">
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
};

export default Profile;