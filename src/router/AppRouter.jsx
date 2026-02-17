import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import ForumList from "../pages/ForumList"; 
import Profile from "../pages/Profile";   
 
const AppRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<h2>404: Страница не найдена</h2>} />
    </Routes>
  );
};

export default AppRouter;