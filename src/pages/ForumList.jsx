import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForumList.css";

const ForumList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  return (
    <div className="layout-wrapper">
      <main className="main-content">
        <div className="forum-header">
          <h1>Все вопросы</h1>
        </div>

        <div className="posts-list">
          {posts.length === 0 ? (
            <p className="empty-message">Вопросов пока нет. Будь первым!</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-stats">
                  <span>0 ответов</span>
                </div>
                <div className="post-info">
                  <Link to={`/post/${post.id}`} className="post-link">
                    <h3 className="post-title-list">{post.title}</h3>
                  </Link>
                  <div className="post-meta">
                    <span className="post-author">{post.author}</span>
                    <span className="post-date">{post.date}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ForumList;