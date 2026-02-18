import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';

const Communities = () => {
  const [subscribed, setSubscribed] = useState(() => {
    const saved = localStorage.getItem('my_subscriptions');
    return saved ? JSON.parse(saved) : {};
  });

  const communities = [
    { id: 1, name: "Разработка", members: "45k", icon: "💻" },
    { id: 2, name: "Дизайн", members: "12k", icon: "🎨" },
    { id: 3, name: "Администрирование", members: "8k", icon: "⚙️" },
    { id: 4, name: "Маркетинг", members: "15k", icon: "📊" },
  ];

  useEffect(() => {
    localStorage.setItem('my_subscriptions', JSON.stringify(subscribed));
  }, [subscribed]);

  const toggleSubscribe = (id) => {
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

        <div className="communities-list" style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
          {communities.map(hub => (
            <div key={hub.id} className="post-card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                <span style={{fontSize: '30px'}}>{hub.icon}</span>
                <div>
                  <h3 style={{margin: 0}}>{hub.name}</h3>
                  <p style={{margin: 0, color: '#999', fontSize: '14px'}}>{hub.members} участников</p>
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