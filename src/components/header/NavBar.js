import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-item">Why Dark Skies?</div>
      <div className="navbar-item">Locations</div>
      <div className="navbar-item">Favorites</div>
      <div className="navbar-item">
        <Link to="/new-location" className="link-styling">
          Add New Location
        </Link>
      </div>
    </div>
  );
};
