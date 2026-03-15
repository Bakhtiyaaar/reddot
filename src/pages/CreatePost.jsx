import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import "../styles/CreatePost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handlePublish = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Заполни поля");
      return;
    }

    const author = JSON.parse(localStorage.getItem("user"))?.username || "Аноним";

    const newPost = {
      title: title,
      content: content,
      author: author
    };

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        alert("Опубликовано в MongoDB!");
        navigate("/");
      } else {
        const errorData = await response.json();
        alert(`Ошибка сервера: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Ошибка при отправке поста:", error);
      alert("Не удалось связаться с сервером. Проверь, запущен ли бэкенд!");
    }
  }; 

  return (
    <div className="layout-wrapper">
      <main className="main-content">
        <h2 className="page-title">Новый вопрос</h2>
        <hr />
        
        <form className="question-form" onSubmit={handlePublish}>
          <div className="form-group">
            <br />
            <label>Суть вопроса</label>
            <input 
              type="text" 
              placeholder="Например: Как выжить на слабом ноуте?" 
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Детали вопроса</label>
            <div className="editor-container">
              <div className="editor-toolbar">
                <button type="button">B</button>
                <button type="button">I</button>
                <button type="button">{"< >"}</button>
              </div>
              <textarea 
                className="editor-textarea" 
                placeholder="Пиши здесь..."
                rows="15"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
          </div>

          <div className="form-footer">
            <Button type="submit" variant="primary">
              Опубликовать вопрос
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}; 

export default CreatePost;