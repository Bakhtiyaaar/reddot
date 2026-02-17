import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./PostDetail.css"; 

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    
    const foundPost = allPosts.find(p => p.id === Number(id));
    
    setPost(foundPost);
  }, [id]);

  if (!post) {
    return (
      <div className="layout-wrapper">
        <main className="post-container">
          <p>Пост не найден или загружается...</p>
          <button onClick={() => navigate("/")} className="back-btn">На главную</button>
        </main>
      </div>
    );
  }

  return (
    <div className="layout-wrapper">
      <main className="post-container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Назад
        </button>
        
        <h1 className="post-title">{post.title}</h1>
        
        <div className="post-author-info">
          <span className="author-name">{post.author}</span>
          <span className="post-date-detail">{post.date}</span>
        </div>

        <div className="post-content">
          {post.content}
        </div>

        {post.tags && (
          <div className="post-tags">
            {post.tags.split(',').map(tag => (
              <span key={tag} className="tag-item">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PostDetail;