export const apodFetch = () => {
  return fetch(
    "https://api.nasa.gov/planetary/apod?api_key=ZdwTeR1LRbS994zhMckmVGEJwTVOQgivBFHQAFmo"
  ).then((res) => res.json());
};
