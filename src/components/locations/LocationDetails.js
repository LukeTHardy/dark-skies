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

export const LocationDetails = ({ currentUser, userLat, userLong }) => {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const [location, setLocation] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [foundFavorite, setFoundFavorite] = useState({});

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
      <div className="loc-details-card" key={location.id}>
        <h2 className="loc-name">{location.name}</h2>
        <img
          src={location.imageUrl}
          alt={location.name}
          className="loc-details-image"
        />
        <div className="loc-footer">
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
          {/* conditional button rendering */}

          <div className="btn-container">
            {location.favorites?.some(
              (favorite) => favorite.userId === currentUser.id
            ) ? (
              <button
                className="details-btn"
                onClick={handleRemoveFavoriteClick}
              >
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
                  <span className="text">Delete Location</span>
                  <span>Are you sure?</span>
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
