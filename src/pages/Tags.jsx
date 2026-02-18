import React, { useState } from 'react';
import ReactImage from '../assets/images.png';
import JSImg from '../assets/javascript.png';
import DesignImg from '../assets/UX-UI-Design.webp';
import NodeImg from '../assets/node-js.png';
import CssImg from '../assets/css.png';
import CareerImg from '../assets/carrer.png'; 

import '../styles/ForumList.css'; 

const Tags = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
    const allTags = [
        { id: 1, name: "reactjs", count: 125, desc: "Библиотека для создания интерфейсов", image: ReactImage },
        { id: 2, name: "javascript", count: 450, desc: "Основной язык фронтенда", image: JSImg },
        { id: 3, name: "web-design", count: 89, desc: "Тренды и UI/UX решения", image: DesignImg },
        { id: 4, name: "node-js", count: 67, desc: "Серверный JavaScript", image: NodeImg },
        { id: 5, name: "css-tricks", count: 112, desc: "Магия верстки и анимаций", image: CssImg },
        { id: 6, name: "career", count: 230, desc: "Советы по поиску работы и росту", image: CareerImg },
    ];

  const filteredTags = allTags.filter(tag => 
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="layout-wrapper">
      <main className="main-content">
        <div className="forum-header">
          <h1>Все теги</h1>
          <hr></hr>
          <input 
            type="text" 
            placeholder="Поиск по тегам..." 
            className="form-input tag-search-input" 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="tags-grid">
        {filteredTags.map(tag => (
            <div key={tag.id} className="tag-card">
            <div className="tag-image-wrapper">
                <img src={tag.image} alt={tag.name} className="tag-image" />
            </div>
            <div className="tag-info">
                <h3 className="tag-name">#{tag.name}</h3>
                <p className="tag-description">{tag.desc}</p>
                <span className="tag-stats">{tag.count} публикаций</span>
            </div>
            </div>
        ))}
        </div>
      </main>
    </div>
  );
};

export default Tags;