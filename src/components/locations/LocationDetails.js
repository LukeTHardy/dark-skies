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
    <div className="location-card" key={location.id}>
      <div className="location-card-body">
        <div className="location-card-left">
          <div className="location-image">
            <img src={location.imageUrl} alt={location.name} />
          </div>
        </div>
        <div className="location-card-center">
          <h3 className="location-name">{location.name}</h3>
          <div className="location-address">{location.address}</div>
          <div className="location-city">
            {location.city}, {location.state?.name}
          </div>
          <div>
            <span className="location-darkness">Light level:</span>
            {location.bortle}
          </div>
        </div>
        <div className="location-card-right">
          <div className="location-comments">
            Comments: "{location.comments}"
          </div>
        </div>
      </div>

      {/* conditional button rendering */}

      <div className="location-card-footer">
        {location.favorites?.some(
          (favorite) => favorite.userId === currentUser.id
        ) ? (
          <button className="btn" onClick={handleRemoveFavoriteClick}>
            Remove from Favorites
          </button>
        ) : (
          <button className="btn" onClick={handleFavoriteClick}>
            Add To Favorites
          </button>
        )}

        {location.userId === currentUser.id ? (
          <>
            <button className="btn" onClick={handleEditClick}>
              Edit Location
            </button>
            <button className="btn" onClick={handleDeleteClick}>
              Delete Location
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
