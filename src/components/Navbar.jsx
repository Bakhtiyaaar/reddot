import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">🚀 DevForum</Link>
        
        <div className="nav-links">
          <Link to="/">Главная</Link> |
          <Link to="/forums"> Обсуждения</Link> |
          <Link to="/register"> Регистрация</Link> |
          <Link to="/profile/"> Профиль</Link> |
        </div>
      </div>
    </nav>
  );
};

export default Navbar;