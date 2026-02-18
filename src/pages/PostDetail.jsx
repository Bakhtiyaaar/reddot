import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/PostDetail.css"; 

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState(''); 

  useEffect(() => {
    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const foundPost = allPosts.find(p => p.id === Number(id));
    setPost(foundPost);
  }, [id]);

  const handleLike = () => {
    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = allPosts.map(p => {
      if (p.id === post.id) {
        return { ...p, likes: (p.likes || 0) + 1 };
      }
      return p;
    });
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPost({ ...post, likes: (post.likes || 0) + 1 }); 
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      text: commentText,
      author: "Аноним" 
    };

    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = allPosts.map(p => {
      if (p.id === post.id) {
        return { ...p, comments: [...(p.comments || []), newComment] };
      }
      return p;
    });

    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPost({ ...post, comments: [...(post.comments || []), newComment] });
    setCommentText(''); 
  };

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

        <div className="post-actions">
           <button onClick={handleLike} className="like-btn">
             ❤️ {post.likes || 0}
           </button>
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

        <hr />

        <div className="comments-section">
          <h3>Ответы ({post.comments?.length || 0})</h3>
          <div className="comments-list">
            {post.comments && post.comments.map(c => (
              <div key={c.id} className="comment-item">
                <p><strong>{c.author}</strong>: {c.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="comment-form">
            <input 
              type="text" 
              placeholder="Напишите ответ..." 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit">Отправить</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PostDetail;