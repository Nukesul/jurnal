import { Heart, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function Header({ darkMode, setDarkMode }) {
  const { favorites } = useFavorites();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30 transition group-hover:scale-110">
            <span className="text-xl font-bold text-white">Ж</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tighter magazine-title">Кызыктар</h1>
        </Link>

        <div className="flex items-center gap-6">
          {/* Favorites */}
          <Link 
            to="/favorites" 
            className="relative p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-2xl transition-all active:scale-95"
          >
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-medium w-5 h-5 flex items-center justify-center rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Theme Toggle */}
          <button 
            onClick={() => setDarkMode(prev => !prev)}
            className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-2xl transition-all active:scale-95"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}