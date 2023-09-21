export const getFavorites = () => {
  return fetch(`http://localhost:8088/favorites`).then((res) => res.json());
};

export const postNewFavorite = (newFavorite) => {
  return fetch(`http://localhost:8088/favorites`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newFavorite),
  });
};

export const deleteFavoriteById = (favoriteId) => {
  return fetch(`http://localhost:8088/favorites/${favoriteId}`, {
    method: "DELETE",
  });
};
