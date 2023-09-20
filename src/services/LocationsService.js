export const postLocation = (locObj) => {
  return fetch(`http://localhost:8088/locations`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(locObj),
  });
};

export const getLocationById = (locationId) => {
  return fetch(
    `http://localhost:8088/locations/${locationId}?_expand=state`
  ).then((res) => res.json());
};

export const getLocations = () => {
  return fetch(`http://localhost:8088/locations`).then((res) => res.json());
};

export const getLocationsByStateId = (stateId) => {
  return fetch(
    `http://localhost:8088/locations?stateId=${stateId}&_expand=state`
  ).then((res) => res.json());
};

export const getFavoritesByUserId = (userId) => {
  return fetch(
    `http://localhost:8088/favorites?userId=${userId}&_expand=location`
  ).then((res) => res.json());
};

export const deleteLocation = (locationId) => {
  return fetch(`http://localhost:8088/locations/${locationId}`, {
    method: "DELETE",
  });
};

export const modifyLocation = (editedLocObj) => {
  return fetch(`http://localhost:8088/locations/${editedLocObj.id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(editedLocObj),
  });
};
