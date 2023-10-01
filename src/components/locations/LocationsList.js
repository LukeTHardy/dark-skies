import { getStates } from "../../services/StatesService";
import {
  getLocations,
  getLocationsByStateId,
} from "../../services/LocationsService";
import "./LocationsList.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const LocationsList = ({ userLat, userLong }) => {
  const [states, setStates] = useState([]);
  const [stateId, setStateId] = useState(0);
  const [radiusId, setRadiusId] = useState(0);
  const [locationsFilteredByState, setLocationsFilteredByState] = useState([]);
  const [locationsFilteredByRadius, setLocationsFilteredByRadius] = useState(
    []
  );
  const navigate = useNavigate();

  // capture the state Id from user selection
  const handleStateChange = (e) => {
    const selectedStateId = parseInt(e.target.value);
    setRadiusId(0);
    setStateId(selectedStateId);
  };

  // capture the radius Id from the user selections
  const handleRadiusChange = (e) => {
    const selectedRadiusId = parseInt(e.target.value);
    setStateId(0);
    setRadiusId(selectedRadiusId);
  };

  // get all states for the dropdown
  useEffect(() => {
    getStates().then((statesArray) => {
      setStates(statesArray);
    });
  }, []);

  // filter locations by the selected state
  useEffect(() => {
    getLocationsByStateId(stateId).then((stateLocsArray) => {
      setLocationsFilteredByState(stateLocsArray);
    });
  }, [stateId]);

  //filter locations by distance with radius Id and Haversine
  useEffect(() => {
    getLocations().then((locArray) => {
      const nearbyLocs = locArray.filter(handleDistance);
      setLocationsFilteredByRadius(nearbyLocs);
    });
  }, [radiusId]);

  // handler for filtering locations by distance
  const handleDistance = (location) => {
    let locDistance = calculateDistance(location.latitude, location.longitude);
    if (locDistance <= radiusId) {
      return location;
    }
  };
  // degrees/radians conversion
  const degreesToRadians = (degrees) => {
    return (degrees * Math.PI) / 180;
  };
  // Haversine Formula
  const calculateDistance = (locLat, locLong) => {
    let earthRadiusMi = 3959;
    let dLat = degreesToRadians(locLat - userLat);
    let dLong = degreesToRadians(locLong - userLong);
    let lat1 = degreesToRadians(userLat);
    let lat2 = degreesToRadians(locLat);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLong / 2) *
        Math.sin(dLong / 2) *
        Math.cos(lat1) *
        Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = earthRadiusMi * c;
    return distance;
  };

  // display locations after a state has been selected
  if (stateId !== 0) {
    return (
      <div className="locations-comp">
        <section className="locations-header">
          <div className="radius-container">
            <h2>Search Near You</h2>
            <div className="radius-dropdown select">
              <select
                name="radius"
                value={radiusId}
                onChange={handleRadiusChange}
              >
                <option value={0}>Search Radius</option>
                <option value={5}>5 Miles</option>
                <option value={10}>10 Miles</option>
                <option value={20}>20 Miles</option>
                <option value={50}>50 Miles</option>
                <option value={100}>100 Miles</option>
                <option value={200}>200 Miles</option>
              </select>
            </div>
          </div>
          <h3>-- Or --</h3>
          <div className="states-container">
            <h2 className="locations-title">Filter By State</h2>
            <div className="states-dropdown select">
              <select
                name="stateId"
                onChange={handleStateChange}
                value={stateId}
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
        </section>

        <section className="locations-list-container">
          <br></br>

          {!locationsFilteredByState.length ? (
            <h4>
              <i>No results...yet.</i>
            </h4>
          ) : (
            <h2>{locationsFilteredByState[0]?.state?.name} Locations:</h2>
          )}

          {locationsFilteredByState.map((location) => {
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
                      {location.city}, {locationsFilteredByState[0].state?.name}
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
        </section>
        <div className="btn-container">
          <button
            className="add-loc-btn"
            onClick={() => {
              navigate("/add-location");
            }}
          >
            Add A Location
          </button>
        </div>
      </div>
    );
  } else if (radiusId !== 0) {
    return (
      <div className="locations-comp">
        <section className="locations-header">
          <div className="radius-container">
            <h2>Search Near You</h2>
            <div className="radius-dropdown select">
              <select
                name="radius"
                value={radiusId}
                onChange={handleRadiusChange}
              >
                <option value={0}>Search Radius</option>
                <option value={5}>5 Miles</option>
                <option value={10}>10 Miles</option>
                <option value={20}>20 Miles</option>
                <option value={50}>50 Miles</option>
                <option value={100}>100 Miles</option>
                <option value={200}>200 Miles</option>
              </select>
            </div>
          </div>
          <h3>-- Or --</h3>
          <div className="states-container">
            <h2 className="locations-title">Filter By State</h2>
            <div className="states-dropdown select">
              <select
                name="stateId"
                onChange={handleStateChange}
                value={stateId}
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
        </section>

        <section className="locations-list-container">
          <br></br>

          {!locationsFilteredByRadius.length ? (
            <h4>
              <i>No results...yet.</i>
            </h4>
          ) : (
            <h2>Locations within {radiusId} miles:</h2>
          )}

          {locationsFilteredByRadius.map((location) => {
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
                      {location.city},{" "}
                      {locationsFilteredByRadius[0].state?.name}
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
        </section>
        <div className="btn-container">
          <button
            className="add-loc-btn"
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
      <div className="locations-comp">
        <section className="locations-header">
          <div className="radius-container">
            <h2>Search Near You</h2>
            <div className="radius-dropdown select">
              <select
                name="radius"
                value={radiusId}
                onChange={handleRadiusChange}
              >
                <option value={0}>Search Radius</option>
                <option value={5}>5 Miles</option>
                <option value={10}>10 Miles</option>
                <option value={20}>20 Miles</option>
                <option value={50}>50 Miles</option>
                <option value={100}>100 Miles</option>
                <option value={200}>200 Miles</option>
              </select>
            </div>
          </div>
          <h3>-- Or --</h3>
          <div className="states-container">
            <h2 className="locations-title">Filter By State</h2>
            <div className="states-dropdown select">
              <select
                name="stateId"
                onChange={handleStateChange}
                value={stateId}
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
        </section>
        <section className="locations-list-container">
          <br></br>
          <h4>
            <i>No results...yet.</i>
          </h4>
        </section>
        <div className="btn-container">
          <button
            className="add-loc-btn"
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
