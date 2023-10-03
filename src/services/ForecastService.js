export const ForecastService = (locLat, locLong) => {
  return fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${locLat}&lon=${locLong}&appid=729652beba72cb8ebe2d345b36b55b68&units=imperial`
  ).then((res) => res.json());
};
