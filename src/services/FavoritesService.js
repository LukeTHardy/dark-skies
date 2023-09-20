export const getFavorites = () => {
  return fetch(`http://localhost:8088/favorites`).then((res) => res.json());
};
