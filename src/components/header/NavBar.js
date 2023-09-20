import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-item">
        <Link to="/" className="link-styling">
          Why Dark Skies?
        </Link>
      </div>
      <div className="navbar-item">
        <Link to="locations" className="link-styling">
          Locations
        </Link>
      </div>
      <div className="navbar-item">
        <Link to="locations/favorites" className="link-styling">
          Favorites
        </Link>
      </div>
      <div className="navbar-item">
        <Link to="/add-location" className="link-styling">
          Add New Location
        </Link>
      </div>
    </div>
  );
};
