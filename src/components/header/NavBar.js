import { Link } from "react-router-dom";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navbar-item">
        <button
          onClick={() => {
            navigate("/");
          }}
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
        >
          <span className="spark-container">
            <span className="spark" />
          </span>
          <span className="backdrop" />
          <span className="text navbar-item">Add New Location</span>
        </button>
      </div>
    </div>
  );
};
