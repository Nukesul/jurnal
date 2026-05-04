import { useFavorites } from '../context/FavoritesContext';
import MagazineCard from '../components/MagazineCard';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const { favorites } = useFavorites();

  const getMagazineWord = (count) => {
    if (count === 1) return 'журнал';
    if (count >= 2 && count <= 4) return 'журнала';
    return 'журналов';
  };

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
        <Heart className="w-16 h-16 text-zinc-600 mb-6" />
        <h2 className="text-3xl font-bold mb-3">Избранное пусто</h2>
        <p className="text-zinc-400 max-w-xs">
          Здесь будут ваши любимые журналы
        </p>

        <Link 
          to="/" 
          className="inline-flex items-center gap-3 mt-10 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-2xl transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Посмотреть все журналы
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <Heart className="w-9 h-9 text-amber-500" />
          <div>
            <h1 className="text-4xl font-bold">Избранное</h1>
            <p className="text-zinc-400">
              {favorites.length} {getMagazineWord(favorites.length)}
            </p>
          </div>
        </div>

        <Link 
          to="/" 
          className="text-zinc-400 hover:text-white flex items-center gap-2 transition"
        >
          ← Все журналы
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {favorites.map((mag) => (
          <MagazineCard key={mag.id} magazine={mag} />
        ))}
      </div>
    </div>
  );
}