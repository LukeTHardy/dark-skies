import "./LocationDetails.css";
import "./LocationsList.css";
import {
  deleteLocation,
  getLocationById,
} from "../../services/LocationsService";
import {
  deleteFavoriteById,
  getFavorites,
  postNewFavorite,
} from "../../services/FavoritesService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ForecastService } from "../../services/ForecastService";

export const LocationDetails = ({ currentUser }) => {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const [location, setLocation] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [foundFavorite, setFoundFavorite] = useState({});
  const [userLat, setUserLat] = useState("");
  const [userLong, setUserLong] = useState("");
  const [extrasToggle, setExtrasToggle] = useState("");
  const [weather, setWeather] = useState({});

  const ref = useRef(null);
  const scrollToElement = () => {
    ref.current?.scrollIntoView({ behavior: "smooth", alignToTop: false });
  };

  useEffect(() => {
    ForecastService(location.latitude, location.longitude).then(
      (forecastObj) => {
        setWeather(forecastObj);
      }
    );
  }, [location.latitude, location.longitude]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLat(latitude);
          setUserLong(longitude);
          console.log("Latitude: " + latitude);
          console.log("Longitude: " + longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, []);

  // get the list of all favorites
  useEffect(() => {
    getFavorites().then((favsArray) => {
      setFavorites(favsArray);
    });
  }, []);

  // get the individual location with embedded favorites and expanded state details
  useEffect(() => {
    getLocationById(locationId).then((locationObj) => {
      setLocation(locationObj);
    });
  }, [locationId]);

  // find (and set) the specific favorite object that matches this location and current user
  useEffect(() => {
    const thisFavorite = favorites.find(
      (favorite) =>
        favorite.locationId === parseInt(locationId) &&
        favorite.userId === currentUser.id
    );
    setFoundFavorite(thisFavorite);
  }, [currentUser.id, favorites, locationId]);

  // handler functions for all possible button clicks
  const handleEditClick = () => {
    navigate(`/locations/${locationId}/edit`);
  };
  const handleDeleteClick = () => {
    deleteLocation(locationId).then(navigate("/locations"));
  };
  const handleFavoriteClick = () => {
    const newFavorite = {
      locationId: parseInt(locationId),
      userId: currentUser.id,
    };
    postNewFavorite(newFavorite).then(window.location.reload());
  };

  const handleRemoveFavoriteClick = () => {
    const favoriteId = foundFavorite.id;
    deleteFavoriteById(favoriteId).then(window.location.reload());
  };

  const Forecast = () => {
    const formatDate = (dateString) => {
      const options = {
        weekday: "short",
      };
      return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const getWeatherIcon = (description) => {
      if (description === "clear sky") {
        return <i className="large-icon fa-solid fa-moon"></i>;
      } else if (description === "few clouds") {
        return <i className="large-icon fa-solid fa-cloud-moon"></i>;
      } else if (description === "scattered clouds" || "overcast clouds") {
        return <i className="large-icon fa-solid fa-cloud-moon"></i>;
      } else if (description === "broken clouds") {
        return <i className="large-icon fa-solid fa-cloud-moon-rain"></i>;
      } else if (description === "shower rain") {
        return <i className="large-icon fa-solid fa-cloud-rain"></i>;
      } else if (
        description === "rain" ||
        "light rain" ||
        "heavy intensity rain" ||
        "very heavy rain"
      ) {
        return <i className="large-icon fa-solid fa-cloud-showers-rain"></i>;
      } else if (
        description === "thunderstorm" ||
        "thunderstorm with light rain" ||
        "thunderstorm with rain" ||
        "thunderstorm with heavy rain" ||
        "light thunderstorm" ||
        "heavy thunderstorm" ||
        "ragged thunderstorm" ||
        "thunderstorm with light drizzle" ||
        "thunderstorm with drizzle" ||
        "thunderstorm with heavy drizzle"
      ) {
        return <i className="large-icon fa-solid fa-cloud-bolt"></i>;
      } else if (description === "snow" || "light snow" || "heavy snow") {
        return <i className="large-icon fa-regular fa-snowflake"></i>;
      }
    };

    return (
      <div className="weather-container">
        <div className="weather-header">
          <div className="weather-city">{location.city}</div>
          <div className="weather-title-icon">
            {getWeatherIcon(weather.list[7].weather[0].description)}
          </div>
          <div className="weather-temp">
            {Math.round(weather.list[0].main.temp)}°F
          </div>
        </div>
        <div className="weather-days-container">
          <div className="weather-day">
            <div className="weather-date">
              {formatDate(weather.list[0].dt_txt)}
            </div>

            <div className="weather-icon">
              {getWeatherIcon(weather.list[0].weather[0].description)}
            </div>
            <br></br>

            <div className="weather-clouds">
              Clouds: {weather.list[0].clouds.all}%
            </div>
            <div className="weather-precip">
              Rain: {Math.round(weather.list[0].pop * 100)}%
            </div>
            <div className="weather-high">
              High: {Math.round(weather.list[5].main.temp_max)}°F
            </div>
            <div className="weather-low">
              Low: {Math.round(weather.list[1].main.temp_min)}°F
            </div>
          </div>
          <div className="weather-day">
            <div className="weather-date">
              {formatDate(weather.list[7].dt_txt)}
            </div>

            <div className="weather-icon">
              {getWeatherIcon(weather.list[7].weather[0].description)}
            </div>
            <br></br>

            <div className="weather-clouds">
              Clouds: {weather.list[7].clouds.all}%
            </div>
            <div className="weather-precip">
              Rain: {Math.round(weather.list[7].pop * 100)}%
            </div>
            <div className="weather-high">
              High: {Math.round(weather.list[13].main.temp_max)}°F
            </div>
            <div className="weather-low">
              Low: {Math.round(weather.list[8].main.temp_min)}°F
            </div>
          </div>
          <div className="weather-day">
            <div className="weather-date">
              {formatDate(weather.list[15].dt_txt)}
            </div>

            <div className="weather-icon">
              {getWeatherIcon(weather.list[15].weather[0].description)}
            </div>
            <br></br>

            <div className="weather-clouds">
              Clouds: {weather.list[15].clouds.all}%
            </div>
            <div className="weather-precip">
              Rain: {Math.round(weather.list[15].pop * 100)}%
            </div>
            <div className="weather-high">
              High: {Math.round(weather.list[21].main.temp_max)}°F
            </div>
            <div className="weather-low">
              Low: {Math.round(weather.list[16].main.temp_min)}°F
            </div>
          </div>
          <div className="weather-day">
            <div className="weather-date">
              {formatDate(weather.list[23].dt_txt)}
            </div>

            <div className="weather-icon">
              {getWeatherIcon(weather.list[23].weather[0].description)}
            </div>
            <br></br>

            <div className="weather-clouds">
              Clouds: {weather.list[23].clouds.all}%
            </div>
            <div className="weather-precip">
              Rain: {Math.round(weather.list[23].pop * 100)}%
            </div>
            <div className="weather-high">
              High: {Math.round(weather.list[29].main.temp_max)}°F
            </div>
            <div className="weather-low">
              Low: {Math.round(weather.list[24].main.temp_min)}°F
            </div>
          </div>
          <div className="weather-day">
            <div className="weather-date">
              {formatDate(weather.list[31].dt_txt)}
            </div>

            <div className="weather-icon">
              {getWeatherIcon(weather.list[31].weather[0].description)}
            </div>
            <br></br>

            <div className="weather-clouds">
              Clouds: {weather.list[31].clouds.all}%
            </div>
            <div className="weather-precip">
              Rain: {Math.round(weather.list[31].pop * 100)}%
            </div>
            <div className="weather-high">
              High: {Math.round(weather.list[37].main.temp_max)}°F
            </div>
            <div className="weather-low">
              Low: {Math.round(weather.list[32].main.temp_min)}°F
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleDirectionsClick = () => {
    setExtrasToggle("directions");
    scrollToElement();
  };
  const handleForecastClick = () => {
    setExtrasToggle("forecast");
    scrollToElement();
  };

  const handleExtrasRender = () => {
    if (extrasToggle === "directions") {
      return (
        <iframe
          title="directions"
          className="directions-widget"
          loading="lazy"
          src={`https://www.google.com/maps/embed/v1/directions?origin=${userLat}%2C%20${userLong}&destination=${location.latitude}%2C%20${location.longitude}&key=AIzaSyD8ttv16qqiCwhPXepoOUpMXiq4C0a9wgI`}
        ></iframe>
      );
    } else if (extrasToggle === "forecast") {
      return Forecast();
    } else {
      return "";
    }
  };

  // JSX for location details
  return (
    <div className="details-comp">
      <h2 className="loc-name">{location.name}</h2>
      <div className="details-card-container">
        <div className="loc-details-card" key={location.id}>
          <img
            src={location.imageUrl}
            alt={location.name}
            className="loc-details-image"
          />
          <div className="loc-deets">
            <div className="loc-address">{location.address}</div>
            <div className="loc-city-state">
              {location.city}, {location.state?.name}
            </div>
            <div className="loc-darkness">Light level: {location.bortle}</div>
            <br></br>
            <div className="loc-footer">
              <div className="loc-comments">
                {location.comments
                  ? `Comments: "${location.comments}"`
                  : "Comments: N/A"}
              </div>
            </div>
          </div>
          <br></br>
          <div className="extra-btns">
            <button className="details-btn" onClick={handleForecastClick}>
              Get Forecast <i className="fa-solid fa-cloud-moon"></i>
            </button>
            <button className="details-btn" onClick={handleDirectionsClick}>
              Get Directions <i className="fa-solid fa-location-dot"></i>
            </button>
          </div>
        </div>
        <div className="btn-container">
          {location.favorites?.some(
            (favorite) => favorite.userId === currentUser.id
          ) ? (
            <button className="details-btn" onClick={handleRemoveFavoriteClick}>
              Remove from Favorites <i className="fa-regular fa-moon"></i>
            </button>
          ) : (
            <button className="details-btn" onClick={handleFavoriteClick}>
              Add To Favorites <i className="fa-solid fa-moon"></i>
            </button>
          )}

          {location.userId === currentUser.id ? (
            <>
              <button className="details-btn" onClick={handleEditClick}>
                Edit <i className="fa-solid fa-pen"></i>
              </button>
              <button
                id="delete-btn"
                // role="button"
                onClick={handleDeleteClick}
              >
                <span className="text">
                  Delete <i className="fa-solid fa-trash"></i>
                </span>
                <span>Are you sure?</span>
              </button>
            </>
          ) : (
            <>
              <button className="details-btn-inactive">Edit</button>
              <button className="details-btn-inactive">Delete</button>
            </>
          )}
        </div>
      </div>
      <div ref={ref} className="directions-weather-container">
        {handleExtrasRender()}
      </div>
    </div>
  );
};

// AIzaSyD8ttv16qqiCwhPXepoOUpMXiq4C0a9wgI google maps API key
