import "./Favorites.css";
import "./LocationsList.css";
import { getLocationsWithFavorites } from "../../services/LocationsService";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Favorites = ({ currentUser }) => {
  const [locations, setLocations] = useState([]);
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLocationsWithFavorites().then((locArray) => {
      setLocations(locArray);
    });
  }, []);

  useEffect(() => {
    const foundFavorites = locations.filter((location) =>
      location.favorites.some((favorite) => favorite.userId === currentUser.id)
    );
    setFavoriteLocations(foundFavorites);
  }, [currentUser.id, locations]);

  if (favoriteLocations.length !== 0) {
    return (
      <div className="locations-page">
        <div className="locations-header">
          <section className="locations-list-container">
            <h3>My Locations:</h3>
            {favoriteLocations.map((location) => {
              return (
                <Link to={`/locations/${location.id}`} key={location.id}>
                  <div className="locations-card" key={location.id}>
                    <div className="location-card-left">
                      <div className="location-image">
                        <img src={location.imageUrl} alt={location.name} />
                      </div>
                    </div>
                    <div className="location-card-center">
                      <div className="location-name">{location.name}</div>
                      <div>
                        <span className="location-darkness">Darkness:</span>
                        {location.bortle}
                      </div>
                    </div>
                    <div className="location-card-right">
                      <div className="location-address">{location.address}</div>
                      <div className="location-city">
                        {location.city}, {location.state.name}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </section>
          <button
            className="btn"
            onClick={() => {
              navigate("/add-location");
            }}
          >
            Add A Location
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="locations-page">
        <div className="locations-header">
          <section className="locations-list-container">
            <i>No favorites saved...yet</i>
          </section>
          <button
            className="btn"
            onClick={() => {
              navigate("/add-location");
            }}
          >
            Add A Location
          </button>
        </div>
      </div>
    );
  }
};
