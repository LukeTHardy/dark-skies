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
          className={`navbar-btn ${isCurrentRoute("/") ? "link-active" : ""}`}
        >
          <span className="spark-container">
            <span className="spark" />
          </span>
          <span className="backdrop" />
          <span className="text navbar-item">
            About <i className="fa-solid fa-house"></i>
          </span>
        </button>
      </div>
      <div className="navbar-item">
        <button
          onClick={() => {
            navigate("/locations");
          }}
          className={`navbar-btn ${
            isCurrentRoute("/locations") ? "link-active" : ""
          }`}
        >
          <span className="spark-container">
            <span className="spark" />
          </span>
          <span className="backdrop" />
          <span className="text navbar-item">
            Find Locations <i className="fa-solid fa-binoculars"></i>
          </span>
        </button>
      </div>
      <div className="navbar-item">
        <button
          onClick={() => {
            navigate("/locations/favorites");
          }}
          className={`navbar-btn ${
            isCurrentRoute("/locations/favorites") ? "link-active" : ""
          }`}
        >
          <span className="spark-container">
            <span className="spark" />
          </span>
          <span className="backdrop" />
          <span className="text navbar-item">
            Favorites <i className="fa-solid fa-moon"></i>
          </span>
        </button>
      </div>
      <div className="navbar-item">
        <button
          onClick={() => {
            navigate("/add-location");
          }}
          className={`navbar-btn ${
            isCurrentRoute("/add-location") ? "link-active" : ""
          }`}
        >
          <span className="spark-container">
            <span className="spark" />
          </span>
          <span className="backdrop" />
          <span className="text navbar-item">
            New Location <i className="fa-solid fa-thumbtack"></i>
          </span>
        </button>
      </div>
      <div className="navbar-item">
        <button
          onClick={() => {
            navigate("/station");
          }}
          className={`navbar-btn ${
            isCurrentRoute("/station") ? "link-active" : ""
          }`}
        >
          <span className="spark-container">
            <span className="spark" />
          </span>
          <span className="backdrop" />
          <span className="text navbar-item">
            Spot The Station <i className="fa-solid fa-rocket"></i>
          </span>
        </button>
      </div>
    </div>
  );
};
