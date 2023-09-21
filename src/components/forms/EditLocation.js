import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getLocationById,
  modifyLocation,
} from "../../services/LocationsService";
import { getStates } from "../../services/StatesService";

export const EditLocation = () => {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const [location, setLocation] = useState({});
  const [states, setStates] = useState([]);

  useEffect(() => {
    getLocationById(locationId).then((locObj) => {
      setLocation(locObj);
    });
  }, [locationId]);

  useEffect(() => {
    getStates().then((statesArray) => {
      setStates(statesArray);
    });
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    const updatedLocation = {
      id: location.id,
      name: location.name,
      imageUrl: location.imageUrl,
      city: location.city,
      stateId: location.stateId,
      address: location.address,
      latitude: location.latitude,
      longitude: location.longitude,
      bortle: location.bortle,
      comments: location.comments,
      userId: location.userId,
    };

    modifyLocation(updatedLocation).then(() => {
      navigate(`/locations/${locationId}`);
    });
  };

  return (
    <form className="location-form">
      <h2 className="location-form-title">Edit Location</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            value={location.name ? location.name : ""}
            type="text"
            className="form-control"
            placeholder="item name"
            onChange={(event) => {
              const locationCopy = { ...location };
              locationCopy.name = event.target.value;
              setLocation(locationCopy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            id="imageUrl"
            name="imageUrl"
            value={location.imageUrl ? location.imageUrl : ""}
            type="text"
            className="form-control"
            placeholder="https://www.example.com"
            onChange={(event) => {
              const locationCopy = { ...location };
              locationCopy.imageUrl = event.target.value;
              setLocation(locationCopy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            id="city"
            name="city"
            value={location.city ? location.city : ""}
            type="text"
            className="form-control"
            placeholder="City name"
            onChange={(event) => {
              const locationCopy = { ...location };
              locationCopy.city = event.target.value;
              setLocation(locationCopy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <div>State:</div>
          <select
            name="stateId"
            value={location.stateId}
            onChange={(event) => {
              const locationCopy = { ...location };
              locationCopy.stateId = parseInt(event.target.value);
              setLocation(locationCopy);
            }}
          >
            <option value={0}>Select a state</option>
            {states.map((state) => {
              return (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            name="address"
            value={location.address ? location.address : ""}
            type="text"
            className="form-control"
            placeholder="123 Space Lane"
            onChange={(event) => {
              const locationCopy = { ...location };
              locationCopy.address = event.target.value;
              setLocation(locationCopy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="latitude">Latitude:</label>
          <input
            id="latitude"
            name="latitude"
            value={location.latitude ? location.latitude : ""}
            type="text"
            className="form-control"
            placeholder="numbersnumbersnumbers"
            onChange={(event) => {
              const locationCopy = { ...location };
              locationCopy.latitude = parseFloat(event.target.value);
              setLocation(locationCopy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="longitude">Longitude:</label>
          <input
            id="longitude"
            name="longitude"
            value={location.longitude ? location.longitude : ""}
            type="text"
            className="form-control"
            placeholder="numbersnumbersnumbers"
            onChange={(event) => {
              const locationCopy = { ...location };
              locationCopy.longitude = parseFloat(event.target.value);
              setLocation(locationCopy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="bortle">Darkness:</label>
          <input
            id="bortle"
            name="bortle"
            value={location.bortle ? location.bortle : ""}
            type="text"
            className="form-control"
            placeholder="# 1-9"
            onChange={(event) => {
              const locationCopy = { ...location };
              locationCopy.bortle = parseInt(event.target.value);
              setLocation(locationCopy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="comments">Comments:</label>
          <input
            id="comments"
            name="comments"
            value={location.comments ? location.comments : ""}
            type="text"
            className="form-control"
            placeholder="What's it like?"
            onChange={(event) => {
              const locationCopy = { ...location };
              locationCopy.comments = event.target.value;
              setLocation(locationCopy);
            }}
          />
        </div>
      </fieldset>
      <button className="btn" onClick={handleSave}>
        Update Location
      </button>
    </form>
  );
};
