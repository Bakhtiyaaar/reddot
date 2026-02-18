import AppRouter from './router/AppRouter';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'; 
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext'; 
import './App.css'; 
import './styles/Mobile.css';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <AuthProvider>
      {isAuthPage ? (
        <div className="auth-only-layout">
          <AppRouter />
        </div>
      ) : (
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
      )}
    </AuthProvider>
  );
}

export default App;