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
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="relative mb-8">
          <Heart className="w-24 h-24 text-zinc-700 dark:text-zinc-600" />
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-medium mb-4">Избранное пусто</h2>
        <p className="text-zinc-400 max-w-sm text-lg">
          Добавляйте понравившиеся журналы в избранное, чтобы быстро находить их позже
        </p>

        <Link
          to="/"
          className="mt-12 flex items-center gap-3 px-8 py-4 bg-white dark:bg-zinc-800 
                     hover:bg-amber-400 hover:text-black transition-all rounded-2xl 
                     font-medium text-base active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          Посмотреть все журналы
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 md:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center">
            <Heart className="w-8 h-8 text-amber-500" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-medium">Избранное</h1>
            <p className="text-zinc-400 mt-1 text-lg">
              {favorites.length} {getMagazineWord(favorites.length)}
            </p>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition text-base"
        >
          ← Все журналы
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 md:gap-6">
        {favorites.map((mag) => (
          <MagazineCard key={mag.id} magazine={mag} />
        ))}
      </div>
    </div>
  );
}