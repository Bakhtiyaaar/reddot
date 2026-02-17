import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/Register";
import ForumList from "../pages/ForumList"; 
import Login from "../pages/Login"; 
import Profile from "../pages/Profile";   
import CreatePost from "../pages/CreatePost";
import PostDetail from "../pages/PostDetail"; 

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ForumList />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/ask" element={<CreatePost />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/forums" element={<Navigate to="/" replace />} />
      <Route path="*" element={<h2>404: Страница не найдена</h2>} />
    </Routes>
  );
};

export default AppRouter;