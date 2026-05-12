import { Heart, Sun, Moon, Menu, User, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Header({ darkMode, setDarkMode }) {
  const { favorites } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    getUser();

    // Подписка на изменения авторизации
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/90 dark:bg-zinc-950/90 border-b border-zinc-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4 md:py-5 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 
                          flex items-center justify-center shadow-lg shadow-orange-500/30 
                          transition-all group-hover:scale-110">
            <span className="text-2xl font-bold text-white">Ж</span>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tighter">Кызыктар</h1>
            <p className="text-[10px] text-amber-600 dark:text-amber-500 -mt-1 hidden sm:block">ЖУРНАЛЫ</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <Link 
            to="/favorites" 
            className="flex items-center gap-2 px-5 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-2xl transition-all relative"
          >
            <Heart className="w-5 h-5" />
            <span className="text-sm font-medium">Избранное</span>
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-medium min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>

          {user ? (
            <Link 
              to="/profile"
              className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-2xl transition-all active:scale-95"
            >
              <User className="w-5 h-5" />
            </Link>
          ) : (
            <Link 
              to="/login"
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-2xl font-medium transition-all"
            >
              <LogIn className="w-5 h-5" />
              <span>Войти</span>
            </Link>
          )}

          <button 
            onClick={() => setDarkMode(prev => !prev)}
            className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-2xl transition-all active:scale-95"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-2xl"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-white dark:bg-zinc-950">
          <div className="px-5 py-6 flex flex-col gap-4">
            <Link 
              to="/favorites" 
              className="flex items-center gap-3 px-5 py-4 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-2xl text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart className="w-6 h-6" />
              Избранное {favorites.length > 0 && `(${favorites.length})`}
            </Link>

            {user ? (
              <Link 
                to="/profile"
                className="flex items-center gap-3 px-5 py-4 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-2xl text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-6 h-6" />
                Кабинет
              </Link>
            ) : (
              <Link 
                to="/login"
                className="flex items-center gap-3 px-5 py-4 bg-amber-500 text-black rounded-2xl font-medium text-lg justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="w-6 h-6" />
                Войти в аккаунт
              </Link>
            )}

            <button 
              onClick={() => {
                setDarkMode(prev => !prev);
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 px-5 py-4 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-2xl text-lg w-full text-left"
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              {darkMode ? 'Светлая тема' : 'Тёмная тема'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}