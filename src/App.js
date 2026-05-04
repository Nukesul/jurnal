import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MagazineDetail from './pages/MagazineDetail';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import { FavoritesProvider } from './context/FavoritesContext';
import Admin from './pages/Admin';
function App() {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <FavoritesProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/magazine/:id" element={<MagazineDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/admin" element={<Admin />} />  {/* ← ВОТ ЭТО */}
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;