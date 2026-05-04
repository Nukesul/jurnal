import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (magazine) => {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.id === magazine.id);

      if (exists) {
        return prev.filter((m) => m.id !== magazine.id);
      }

      return [...prev, magazine];
    });
  };

  const isFavorite = (id) => {
    return favorites.some((m) => m.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);