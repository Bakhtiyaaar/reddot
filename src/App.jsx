import AppRouter from './router/AppRouter';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'; 
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom'; 
import './App.css'; 

function App() {
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return (
      <div className="auth-only-layout">
        <AppRouter />
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="container">
        <Sidebar /> 
        <main className="main-content">
          <AppRouter />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;