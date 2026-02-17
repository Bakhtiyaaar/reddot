import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Link to="/register" className="nav-item login-link">👤 Войти / Регистрация</Link>
      <Link to="/forums" className="nav-item">Все вопросы</Link>
      <Link to="/tags" className="nav-item">Все теги</Link>
      <Link to="/communities" className="nav-item">Сообщества</Link>
      <Link to="/profile" className="nav-item">Мой профиль</Link>
    </aside>
  );
};

export default Sidebar;