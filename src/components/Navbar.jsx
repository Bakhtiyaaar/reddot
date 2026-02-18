import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      navigate(`/?search=${value}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          🚀 Red<span>dot</span>
        </Link>
      </div>
      
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Найти вопрос..." 
          value={searchTerm}
          onChange={handleSearch} 
        />
      </div>

      <div className="header-right">
        <Link to="/ask">
          <button className="btn-ask">Задать вопрос</button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;