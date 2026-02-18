import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../hooks/useAuth'; 
import { Button } from '../components/Button';
import '../styles/Communities.css';

const COMMUNITIES_DATA = [
  { id: 1, name: "Разработка", members: "45k", icon: "💻" },
  { id: 2, name: "Дизайн", members: "12k", icon: "🎨" },
  { id: 3, name: "Администрирование", members: "8k", icon: "⚙️" },
  { id: 4, name: "Маркетинг", members: "15k", icon: "📊" },
];

const Communities = () => {
  const { user } = useAuth(); 
  const navigate = useNavigate();
  
  const [subscribed, setSubscribed] = useState(() => {
    const saved = localStorage.getItem('my_subscriptions');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('my_subscriptions', JSON.stringify(subscribed));
  }, [subscribed]);

  const toggleSubscribe = (id) => {
    if (!user) {
      alert("Войдите в аккаунт, чтобы подписываться на сообщества!");
      navigate('/login'); 
      return;
    }

    setSubscribed(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="layout-wrapper">
      <main className="main-content">
        <div className="forum-header">
          <h1>Сообщества</h1>
        </div>

        <div className="communities-list">
          {COMMUNITIES_DATA.map(hub => (
            <div key={hub.id} className="post-card community-item">
              <div className="community-info">
                <span className="community-icon">{hub.icon}</span>
                <div className="community-text">
                  <h3>{hub.name}</h3>
                  <p>{hub.members} участников</p>
                </div>
              </div>
              
              <Button 
                variant={subscribed[hub.id] ? "secondary" : "primary"}
                onClick={() => toggleSubscribe(hub.id)}
              >
                {subscribed[hub.id] ? "Вы подписаны" : "Подписаться"}
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Communities;