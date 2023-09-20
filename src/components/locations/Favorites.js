import "./Favorites.css";
import "./LocationsList.css";
import { getFavoritesByUserId } from "../../services/LocationsService";
import { useEffect, useState } from "react";
import { getStates } from "../../services/StatesService";
import { Link, Navigate, useNavigate } from "react-router-dom";

export const Favorites = ({ currentUser }) => {
  const [favorites, setFavorites] = useState([]);
  const [states, setStates] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getStates().then((statesArray) => {
      setStates(statesArray);
    });
  }, []);

  useEffect(() => {
    getFavoritesByUserId(currentUser.id).then((favoritesArray) => {
      setFavorites(favoritesArray);
    });
  }, [currentUser.id]);

  if (favorites.length !== 0) {
    return (
      <div className="locations-page">
        <div className="locations-header">
          <section className="locations-list-container">
            <h3>My Locations:</h3>
            {favorites.map((location) => {
              return (
                <Link to={`/locations/${location.id}`} key={location.id}>
                  <div className="location-card" key={location.location.id}>
                    <div className="location-card-left">
                      <div className="location-image">
                        <img
                          src={location.location.imageUrl}
                          alt={location.location.name}
                        />
                      </div>
                    </div>
                    <div className="location-card-center">
                      <div className="location-name">
                        {location.location.name}
                      </div>
                      <div>
                        <span className="location-darkness">Darkness:</span>
                        {location.location.bortle}
                      </div>
                    </div>
                    <div className="location-card-right">
                      <div className="location-address">
                        {location.location.address}
                      </div>
                      <div className="location-city">
                        {location.location.city},{" "}
                        {
                          states.find(
                            (state) => state.id === location.location.stateId
                          )?.name
                        }
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
