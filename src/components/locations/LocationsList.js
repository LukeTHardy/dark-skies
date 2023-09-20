import { getStates } from "../../services/StatesService";
import { getLocationsByStateId } from "../../services/LocationsService";
import "./LocationsList.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const LocationsList = () => {
  const [states, setStates] = useState([]);
  const [stateId, setStateId] = useState(0);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getStates().then((statesArray) => {
      setStates(statesArray);
    });
  }, []);

  useEffect(() => {
    getLocationsByStateId(stateId).then((statesArray) => {
      setFilteredLocations(statesArray);
    });
  }, [stateId]);

  const handleInputChange = (e) => {
    const selectedStateId = parseInt(e.target.value);
    setStateId(selectedStateId);
  };

  if (stateId !== 0) {
    return (
      <div className="locations-page">
        <div className="locations-header">
          <h2 className="locations-title">Which State Do You Live In?</h2>
          <div className="states-dropdown">
            <select name="stateId" onChange={handleInputChange} value={stateId}>
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

        <section className="locations-list-container">
          <h3>{filteredLocations[0]?.state.name}</h3>
          {filteredLocations.map((location) => {
            return (
              <Link to={`/locations/${location.id}`} key={location.id}>
                <div className="location-card" key={location.id}>
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
                      {location.city}, {filteredLocations[0].state?.name}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          <button
            className="btn"
            onClick={() => {
              navigate("/add-location");
            }}
          >
            Add A Location
          </button>
        </section>
      </div>
    );
  } else {
    return (
      <div className="locations-page">
        <div className="locations-header">
          <h2 className="locations-title">Which State Do You Live In?</h2>
          <div className="states-dropdown">
            <select name="stateId" onChange={handleInputChange} value={stateId}>
              <option value={0}>Please select a state</option>
              {states.map((statesObj) => {
                return (
                  <option key={statesObj.id} value={statesObj.id}>
                    {statesObj.name}
                  </option>
                );
              })}
            </select>
          </div>
          <section className="locations-list-container">
            <i>No state selected</i>
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

// REFERENCE CODE:

// return (
//   <div className="item-container">
//     {items.map((item) => {
//       return (
//         <div key={item.id} className="item-card">
//           <img
//             src={item.imageUrl}
//             alt={item.name}
//             className="item-img"
//             onClick={() => {
//               navigate(`/items/${item.id}`);
//             }}
//           ></img>
//           <div className="item-name">{item.name}</div>
//         </div>
//       );
//     })}
//   </div>
// );
