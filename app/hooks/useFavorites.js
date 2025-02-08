import { useState } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (repo) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === repo.id);
      return isFavorite ? prevFavorites.filter((fav) => fav.id !== repo.id) : [...prevFavorites, repo];
    });
  };

  return { favorites, toggleFavorite };
};
