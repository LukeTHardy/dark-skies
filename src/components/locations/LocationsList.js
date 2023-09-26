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

  // get all the states for the dropdown menu
  useEffect(() => {
    getStates().then((statesArray) => {
      setStates(statesArray);
    });
  }, []);
  // get the locations for the selected state
  useEffect(() => {
    getLocationsByStateId(stateId).then((statesArray) => {
      setFilteredLocations(statesArray);
    });
  }, [stateId]);
  // capture the state Id from the user selection
  const handleInputChange = (e) => {
    const selectedStateId = parseInt(e.target.value);
    setStateId(selectedStateId);
  };
  // display locations after a state has been selected
  if (stateId !== 0) {
    return (
      <div className="locations-page">
        <div className="locations-header">
          <h3 className="locations-title">Where Do You Live?</h3>
          <div className="states-dropdown select">
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
          <h2>{filteredLocations[0]?.state?.name} Locations:</h2>
          {filteredLocations.map((location) => {
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
                      {location.city}, {filteredLocations[0].state?.name}
                    </div>
                  </div>
                  <div className="location-card-right">
                    <div>
                      <span className="location-darkness">Darkness:</span>
                      {location.bortle}
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
          <h3 className="locations-title">Where Do You Live?</h3>
          <div className="states-dropdown select">
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
          <section className="locations-list-container">
            <br></br>
            <h3>
              <i>No state selected</i>
            </h3>
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
