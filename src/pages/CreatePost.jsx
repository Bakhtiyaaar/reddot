import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import "./CreatePost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handlePublish = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Заполни поля!");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title,
      content: content,
      author: JSON.parse(localStorage.getItem("user"))?.username || "Bateka",
      date: new Date().toLocaleDateString(),
    };

    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    localStorage.setItem("posts", JSON.stringify([newPost, ...existingPosts]));

    alert("Готово!");
    navigate("/"); 
  };

  return (
    <div className="layout-wrapper">
      <main className="main-content">
        <h2 className="page-title">Новый вопрос</h2>
        <hr></hr>
        
        <form className="question-form" onSubmit={handlePublish}>
          <div className="form-group">
            <br></br>
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