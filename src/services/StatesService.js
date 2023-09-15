export const getStates = () => {
  return fetch(`http://localhost:8088/states`).then((res) => res.json());
};
