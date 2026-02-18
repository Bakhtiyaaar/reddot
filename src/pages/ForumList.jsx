import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom"; 
import "../styles/ForumList.css";

const ForumList = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams(); 
  const navigate = useNavigate();

  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="layout-wrapper">
      <main className="main-content">
        <div className="forum-header">
          <h1>{searchQuery ? `Результаты по запросу: "${searchQuery}"` : "Все вопросы"}</h1>
        </div>

        <div className="posts-list">
          {filteredPosts.length === 0 ? (
            <p className="empty-message">
              {searchQuery ? "По вашему запросу ничего не найдено." : "Вопросов пока нет. Будь первым!"}
            </p>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-stats">
                  <div className="stat-item">
                    <span>💬 {post.comments?.length || 0} ответов</span>
                  </div>
                  <div className="stat-item">
                    <span>❤️ {post.likes || 0}</span>
                  </div>
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