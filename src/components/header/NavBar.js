// import { Link } from "react-router-dom";
import "./NavBar.css";
import { useNavigate, useLocation } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define a function to check if a given route is the current route
  const isCurrentRoute = (route) => {
    return location.pathname === route;
  };

  return (
    <div className="navbar">
      <div className="navbar-item">
        <button
          onClick={() => {
            navigate("/");
          }}
          className={isCurrentRoute("/") ? "link-active" : ""}
        >
          <span className="spark-container">
            <span className="spark" />
          </span>
          <span className="backdrop" />
          <span className="text navbar-item">About Dark Skies</span>
        </button>
      </div>
      <div className="navbar-item">
        <button
          onClick={() => {
            navigate("/locations");
          }}
          className={isCurrentRoute("/locations") ? "link-active" : ""}
        >
          <span className="spark-container">
            <span className="spark" />
          </span>
          <span className="backdrop" />
          <span className="text navbar-item">Find Locations</span>
        </button>
      </div>
      <div className="navbar-item">
        <button
          onClick={() => {
            navigate("/locations/favorites");
          }}
          className={
            isCurrentRoute("/locations/favorites") ? "link-active" : ""
          }
        >
          <span className="spark-container">
            <span className="spark" />
          </span>
          <span className="backdrop" />
          <span className="text navbar-item">Favorites</span>
        </button>
      </div>
      <div className="navbar-item">
        <button
          onClick={() => {
            navigate("/add-location");
          }}
          className={isCurrentRoute("/add-location") ? "link-active" : ""}
        >
          <span className="spark-container">
            <span className="spark" />
          </span>
          <span className="backdrop" />
          <span className="text navbar-item">Add New Location</span>
        </button>
      </div>
      <div className="navbar-item">
        <button
          onClick={() => {
            navigate("/station");
          }}
          className={isCurrentRoute("/station") ? "link-active" : ""}
        >
          <span className="spark-container">
            <span className="spark" />
          </span>
          <span className="backdrop" />
          <span className="text navbar-item">Spot The Station</span>
        </button>
      </div>
    </div>
  );
};
