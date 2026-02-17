import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          🚀 Dev<span>Forum</span>
        </Link>
      </div>
      
      <div className="search-box">
        <input type="text" placeholder="Найти вопрос, ответ, тег или пользователя..." />
      </div>

      <div className="header-right">
        <Link to="/ask-question">
          <button className="btn-ask">Задать вопрос</button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;