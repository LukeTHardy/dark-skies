import { useEffect, useState } from "react";
import "./Forms.css";
import { getStates } from "../../services/StatesService";
import { postLocation } from "../../services/LocationsService";

export const NewLocationForm = ({ currentUser }) => {
  const [states, setStates] = useState([]);
  const [newLocation, setNewLocation] = useState({
    name: "",
    imageUrl: "",
    city: "",
    stateId: 0,
    address: "",
    latitude: 0,
    longitude: 0,
    bortle: 0,
    comments: "",
    userId: 0,
  });

  useEffect(() => {
    getStates().then((statesArray) => {
      setStates(statesArray);
    });
  }, []);

  const handleInputChange = (e) => {
    const locationCopy = { ...newLocation };
    locationCopy[e.target.name] = e.target.value;
    setNewLocation(locationCopy);
  };

  const handleSave = (e) => {
    // e.preventDefault();

    const newLocObj = {
      name: newLocation.name,
      imageUrl: newLocation.imageUrl,
      city: newLocation.city,
      stateId: parseInt(newLocation.stateId),
      address: newLocation.address,
      latitude: parseFloat(newLocation.latitude),
      longitude: parseFloat(newLocation.longitude),
      bortle: parseInt(newLocation.bortle),
      comments: newLocation.comments,
      userId: currentUser.id,
    };

    // const newLocObj = { ...newLocation };
    // newLocObj.stateId = parseInt(newLocObj.stateId);
    // newLocObj.latitude = parseFloat(newLocObj.latitude);
    // newLocObj.longitude = parseFloat(newLocObj.longitude);
    // newLocObj.bortle = parseInt(newLocObj.bortle);

    postLocation(newLocObj);
  };

  return (
    <div className="form-container">
      <form className="new-loc-form">
        <h2 className="form-title">New Location</h2>
        <fieldset>
          <div className="loc-form-group">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              value={newLocation.name}
              name="name"
              type="text"
              className="form-control"
              placeholder=""
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="loc-form-group">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              id="imageUrl"
              value={newLocation.imageUrl}
              name="imageUrl"
              type="text"
              className="form-control"
              placeholder=""
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="loc-form-group">
            <label htmlFor="city">City:</label>
            <input
              id="city"
              value={newLocation.city}
              name="city"
              type="text"
              className="form-control"
              placeholder=""
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <div className="state-container">
          <div className="state-title">State:</div>
          <div className="select flex">
            <select
              name="stateId"
              onChange={handleInputChange}
              value={newLocation.stateId}
            >
              <option value={0}>Select a state</option>
              {states.map((statesObj) => {
                return (
                  <option key={statesObj.id} value={statesObj.id}>
                    {statesObj.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <fieldset>
          <div className="loc-form-group">
            <label htmlFor="address">Street Address:</label>
            <input
              id="address"
              value={newLocation.address}
              name="address"
              type="text"
              className="form-control"
              placeholder=""
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="loc-form-group">
            <label htmlFor="latitude">Latitude:</label>
            <input
              id="latitude"
              value={newLocation.latitude}
              name="latitude"
              type="text"
              className="form-control"
              placeholder=""
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="loc-form-group">
            <label htmlFor="longitude">Longitude:</label>
            <input
              id="longitude"
              value={newLocation.longitude}
              name="longitude"
              type="text"
              className="form-control"
              placeholder=""
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="loc-form-group">
            <label htmlFor="bortle">Light Level:</label>
            <input
              id="bortle"
              value={newLocation.bortle}
              name="bortle"
              type="text"
              className="form-control"
              placeholder="Bortle scale #1-10"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="loc-form-group">
            <label htmlFor="comments">Comments:</label>
            <input
              id="comments"
              value={newLocation.comments}
              name="comments"
              type="text"
              className="form-control"
              placeholder=""
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <button className="save-btn" onClick={handleSave}>
          Save Location
        </button>
      </form>
    </div>
  );
};
