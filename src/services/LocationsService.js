export const postLocation = (locObj) => {
  return fetch(`http://localhost:8088/locations`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(locObj),
  });
};

export const getLocations = () => {
  return fetch(`http://localhost:8088/locations`).then((res) => res.json());
};
