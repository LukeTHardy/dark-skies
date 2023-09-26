import "./Banner.css";
import { Link, useNavigate } from "react-router-dom";

export const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="banner">
      {localStorage.getItem("skies_user") ? (
        <div className="banner-item" id="banner-logout">
          <Link
            className="banner-link"
            to=""
            onClick={() => {
              localStorage.removeItem("skies_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </div>
      ) : (
        ""
      )}
      <div className="banner-item" id="banner-title">
        Site Name
      </div>
      <div className="banner-item" id="banner-logo">
        *img*
      </div>
    </div>
  );
};
