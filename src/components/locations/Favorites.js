// import "./Favorites.css";
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
      <div className="locations-comp">
        <div className="locations-header">
          <section className="locations-list-container">
            <h2 className="favorites-title">My Favorites:</h2>
            {favoriteLocations.map((location) => {
              return (
                <Link to={`/locations/${location.id}`} key={location.id}>
                  <div className="locations-card" key={location.id}>
                    <div className="location-card-left">
                      <div>
                        <img
                          src={location.imageUrl}
                          alt={location.name}
                          className="location-image"
                        />
                      </div>
                    </div>
                    <div className="location-card-center">
                      <div className="location-name">{location.name}</div>
                      <div className="location-address address">
                        {location.address}
                      </div>
                      <div className="location-city address">
                        {location.city}, {favoriteLocations[0].state?.name}
                      </div>
                    </div>
                    <div className="location-card-right">
                      <div>
                        <span className="location-darkness">Light Level: </span>
                        {location.bortle}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
            <br></br>
            <button
              className="add-loc-btn"
              onClick={() => {
                navigate("/add-location");
              }}
            >
              Add A Location
            </button>
          </section>
        </div>
      </div>
    );
  } else {
    return (
      <div className="locations-comp">
        <div className="locations-header">
          <section className="locations-list-container">
            <i>No favorites saved...yet</i>
            <br></br>
            <button
              className="add-loc-btn"
              onClick={() => {
                navigate("/locations");
              }}
            >
              Browse Locations
            </button>
          </section>
        </div>
      </div>
    );
  }
};
