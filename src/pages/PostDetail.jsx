import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/PostDetail.css"; 
import { useAuth } from "../hooks/useAuth";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState(''); 
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          console.error("Пост не найден в базе");
        }
      } catch (error) {
        console.error("Ошибка сети:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Вы точно хотите удалить этот пост?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert("Пост удален");
          navigate("/");
        }
      } catch (error) {
        alert("Ошибка при удалении");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      if (response.ok) {
        const updated = await response.json();
        setPost(updated);
        setIsEditing(false);
      }
    } catch (error) {
      alert("Ошибка при обновлении");
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPost(updatedPost); 
      }
    } catch (error) {
      console.error("Ошибка при лайке:", error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const authorName = user ? user.username : "Аноним";

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: commentText,
          author: authorName
        }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPost(updatedPost); 
        setCommentText(''); 
      } else {
        alert("Не удалось сохранить комментарий");
      }
    } catch (error) {
      console.error("Ошибка при отправке комментария:", error);
      alert("Сервер не отвечает");
    }
  };

  if (loading) {
    return (
      <div className="layout-wrapper">
        <main className="post-container">
          <p>Загрузка данных из MongoDB...</p>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="layout-wrapper">
        <main className="post-container">
          <p>Пост не найден в базе данных.</p>
          <button onClick={() => navigate("/")} className="back-btn">На главную</button>
        </main>
      </div>
    );
  }

  const isAuthor = user && user.username === post.author;

  return (
    <div className="layout-wrapper">
      <main className="post-container">
        <div className="post-header-actions">
          <button onClick={() => navigate(-1)} className="back-btn">
            ← Назад
          </button>
          
          {isAuthor && !isEditing && (
            <div className="admin-controls">
              <button onClick={() => {
                setIsEditing(true);
                setEditTitle(post.title);
                setEditContent(post.content);
              }} className="edit-btn">Редактировать</button>
              <button onClick={handleDelete} className="delete-btn">Удалить</button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="edit-post-form">
            <input 
              type="text" 
              className="edit-title-input"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea 
              className="edit-content-textarea"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="edit-buttons">
              <button onClick={handleUpdate} className="save-btn">Сохранить</button>
              <button onClick={() => setIsEditing(false)} className="cancel-btn">Отмена</button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="post-title">{post.title}</h1>
            
            <div className="post-author-info">
              <span className="author-name">{post.author}</span>
              <span className="post-date-detail">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="post-content">
              {post.content}
            </div>

            <div className="post-actions">
               <button onClick={handleLike} className="like-btn">
                 ❤️ {post.likes || 0}
               </button>
            </div>

            {post.tags && Array.isArray(post.tags) && (
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag-item">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </>
        )}

        <div className="comments-section">
          <h3>Ответы ({post.comments?.length || 0})</h3>
          <div className="comments-list">
            {post.comments && post.comments.map(c => (
              <div key={c._id || c.id} className="comment-item">
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