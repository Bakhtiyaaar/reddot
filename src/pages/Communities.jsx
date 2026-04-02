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
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [subscribed, setSubscribed] = useState({});

  useEffect(() => {
    if (user && user.communities) {
      const subsMap = {};
      user.communities.forEach(id => {
        subsMap[id] = true;
      });
      setSubscribed(subsMap);
    }
  }, [user]);

  const toggleSubscribe = async (id) => {
  if (!user) {
    alert("Войдите в аккаунт!");
    navigate('/login');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user._id || user.id, 
        communityId: id
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setUser({ ...user, communities: data });
      
      const subsMap = {};
      data.forEach(subId => { subsMap[subId] = true; });
      setSubscribed(subsMap);
    } else {
      console.error("Ошибка от сервера:", data.message);
    }
  } catch (err) {
    console.error("Ошибка сети:", err);
  }
};

  return (
    <div className="layout-wrapper">
      <main className="main-content">
        <div className="forum-header">
          <h1>Сообщества</h1>
          <p className="subtitle">Вступайте в группы по интересам</p>
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