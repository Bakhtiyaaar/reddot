import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./PostDetail.css"; 

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = {
    title: "Как центрировать div в 2026 году?",
    author: "batekaaa",
    content: "Это подробное описание вопроса с ID: " + id + ". Здесь может быть очень длинный текст с объяснением проблемы.",
    tags: ["css", "frontend", "html"]
  };

  return (
    <div className="layout-wrapper">
      <main className="post-container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Назад
        </button>
        
        <h1 className="post-title">{post.title}</h1>
        
        <div className="post-author-info">
          <div className="avatar-mini">{post.author[0].toUpperCase()}</div>
          <span className="author-name">{post.author}</span>
        </div>

        <div className="post-content">
          {post.content}
        </div>

        <div className="post-tags">
          {post.tags.map(tag => (
            <span key={tag} className="tag-item">
              #{tag}
            </span>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PostDetail;