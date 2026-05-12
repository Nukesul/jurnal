import { Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function MagazineCard({ magazine }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isLiked = isFavorite(magazine.id);
  const rating = magazine.rating || 0;

  return (
    <Link to={`/magazine/${magazine.id}`} className="block group">
      <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 
                         rounded-3xl overflow-hidden transition-all duration-500 
                         hover:shadow-2xl hover:-translate-y-1 active:scale-[0.985]">

        {/* Image */}
        <div className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <img
            src={magazine.cover}
            alt={magazine.title}
            className="w-full h-full object-cover transition-transform duration-700 
                       group-hover:scale-[1.06]"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent 
                          opacity-70 group-hover:opacity-50 transition-opacity" />

          {/* Category */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6">
            <span className="px-3.5 py-1 text-[10px] md:text-xs font-medium tracking-widest uppercase 
                           bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md 
                           text-zinc-800 dark:text-zinc-200 rounded-2xl border border-white/70 shadow-sm">
              {magazine.category || 'Magazine'}
            </span>
          </div>

          {/* Favorite Button - Bigger touch area on mobile */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(magazine);
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-3 md:p-3.5 bg-white/95 dark:bg-zinc-900/95 
                       backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg 
                       hover:scale-110 active:scale-95 transition-all z-10"
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                isLiked
                  ? 'text-red-500 fill-red-500 scale-110'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-red-500'
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 lg:p-9 space-y-5 md:space-y-6">
          <h3 className="font-serif text-[22px] md:text-[26px] leading-tight font-medium 
                         text-zinc-900 dark:text-white line-clamp-3 
                         group-hover:text-amber-700 dark:group-hover:text-amber-400 
                         transition-colors">
            {magazine.title}
          </h3>

          {/* Excerpt */}
          {magazine.excerpt && (
            <p className="text-[15px] md:text-[15.5px] leading-relaxed text-zinc-600 dark:text-zinc-400 
                         line-clamp-3">
              {magazine.excerpt}
            </p>
          )}

          {/* Issue */}
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-light">
            {magazine.issue}
          </p>

          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-white/10">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 md:w-4.5 md:h-4.5 transition-colors ${
                      i <= Math.round(rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-zinc-300 dark:text-zinc-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm md:text-base font-light tabular-nums text-zinc-400">
                {rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}