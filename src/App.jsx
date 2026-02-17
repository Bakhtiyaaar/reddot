import AppRouter from './router/AppRouter';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css'; 

function App() {
  return (
    <div className="app-wrapper">

      <Navbar />

      <main className="main-content">
        <AppRouter />
      </main>

      <Footer />
    </div>
  );
}

export default App;