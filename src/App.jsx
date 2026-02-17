import AppRouter from './router/AppRouter';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'; 
import Footer from './components/Footer';
import './App.css'; 

function App() {
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