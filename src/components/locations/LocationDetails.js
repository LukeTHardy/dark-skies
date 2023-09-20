import "./LocationDetails.css";
import "./LocationsList.css";
import { getLocationById } from "../../services/LocationsService";
import { getFavorites } from "../../services/FavoritesService";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const LocationDetails = ({ currentUser }) => {
  const { locationId } = useParams();
  const [location, setLocation] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [favoriteMatch, setFavoriteMatch] = useState(false);

  useEffect(() => {
    getFavorites().then((favoritesArray) => {
      setFavorites(favoritesArray);
    });
  }, []);

  useEffect(() => {
    getLocationById(locationId).then((locationObj) => {
      setLocation(locationObj);
    });
  }, []);

  useEffect(() => {
    const match = favorites.find(
      (fav) => fav.userId === currentUser.id && fav.locationId === location.id
    );
    if (match) {
      setFavoriteMatch(true);
      console.log("this is a favorite");
    }
  }, [favorites, location.id, currentUser.id]);

  return (
    <div className="location-card" key={location.id}>
      <h3 className="location-title">{location.name}</h3>
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
          {location.city}, {location.state?.name}
        </div>
      </div>
      <div className="btn-container">
        {!favoriteMatch ? (
          <button className="btn">Add To Favorites</button>
        ) : (
          ""
        )}
        {location.userId === currentUser.id ? (
          <div className="user-buttons">
            <button className="btn">Edit Location</button>
            <button className="btn btn-warning">Delete Location</button>
          </div>
        ) : (
          ""
        )}
        {/* {assignedEmployee?.userId === currentUser.id &&
        !ticket.dateCompleted ? (
          <button className="btn btn-warning" onClick={handleClose}>
            Delete Location
          </button>
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
};
