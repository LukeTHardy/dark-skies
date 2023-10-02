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
import { useEffect, useState } from "react";

export const LocationDetails = ({ currentUser }) => {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const [location, setLocation] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [foundFavorite, setFoundFavorite] = useState({});
  const [userLat, setUserLat] = useState("");
  const [userLong, setUserLong] = useState("");

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
    postNewFavorite(newFavorite).then(navigate("/locations/favorites"));
  };

  const handleRemoveFavoriteClick = () => {
    const favoriteId = foundFavorite.id;
    deleteFavoriteById(favoriteId).then(window.location.reload());
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
            <br></br>
            <div>
              <span className="loc-darkness">Light level: </span>
              {location.bortle}
            </div>
            <div className="loc-comments">Comments: "{location.comments}"</div>
          </div>
          <br></br>
          <div className="extra-btns">
            <button className="details-btn">Get Directions</button>
            <button className="details-btn">Get Forecast</button>
          </div>
        </div>
        <div className="btn-container">
          {location.favorites?.some(
            (favorite) => favorite.userId === currentUser.id
          ) ? (
            <button className="details-btn" onClick={handleRemoveFavoriteClick}>
              Remove from Favorites
            </button>
          ) : (
            <button className="details-btn" onClick={handleFavoriteClick}>
              Add To Favorites
            </button>
          )}

          {location.userId === currentUser.id ? (
            <>
              <button className="details-btn" onClick={handleEditClick}>
                Edit
              </button>
              <button
                id="delete-btn"
                // role="button"
                onClick={handleDeleteClick}
              >
                <span className="text">Delete</span>
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
    </div>
  );
};
