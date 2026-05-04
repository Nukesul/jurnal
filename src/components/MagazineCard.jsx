import { Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function MagazineCard({ magazine }) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const isLiked = isFavorite(magazine.id);
  const rating = magazine.rating || 0;

  return (
    <Link to={`/magazine/${magazine.id}`} className="block group">
      <article className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-white/10 
                         rounded-3xl overflow-hidden transition-all duration-500 
                         hover:shadow-2xl hover:-translate-y-2 group-hover:ring-1 group-hover:ring-amber-500/10">

        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={magazine.cover}
            alt={magazine.title}
            className="w-full h-full object-cover transition-transform duration-[800ms] 
                       group-hover:scale-[1.08]"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent 
                          opacity-70 group-hover:opacity-40 transition-opacity duration-500" />

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(magazine); // 🔥 ВАЖНО
            }}
            className="absolute top-5 right-5 p-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md 
                       rounded-2xl border border-white/40 shadow-md hover:scale-110 
                       active:scale-95 transition-all z-10"
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                isLiked
                  ? 'text-red-500 fill-red-500 scale-110'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-red-400'
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="text-[10px] uppercase tracking-[2px] font-medium text-amber-600 dark:text-amber-500">
            {magazine.category || 'Magazine'}
          </div>

          <h3 className="font-serif text-[26px] leading-[1.15] font-medium text-zinc-900 dark:text-white 
                         line-clamp-3 group-hover:text-amber-700 dark:group-hover:text-amber-400 
                         transition-colors duration-300">
            {magazine.title}
          </h3>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 tracking-wide">
            {magazine.issue}
          </p>

          {/* Rating */}
          <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-white/10">
            <div className="flex gap-px">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i <= Math.round(rating)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-zinc-300 dark:text-zinc-700'
                  }`}
                />
              ))}
            </div>

            <span className="text-sm font-light text-zinc-400 tabular-nums">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}