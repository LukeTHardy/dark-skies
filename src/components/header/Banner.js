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
        Dark Skies
      </div>
      <div className="banner-item" id="banner-logo">
        <i></i>
      </div>
      <div className="background-container">
        <img
          id="moon-img"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png"
          alt=""
        />

        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>
    </div>
  );
};

// {localStorage.getItem("skies_user") ? (
//   <div className="banner-item" id="banner-logout">
//     <Link
//       className="banner-link"
//       to=""
//       onClick={() => {
//         localStorage.removeItem("skies_user");
//         navigate("/", { replace: true });
//       }}
//     >
//       Logout
//     </Link>
//   </div>
// ) : (
//   ""
// )}

// <div className="banner-item" id="banner-title">
//   Site Name
// </div>
// <div className="banner-item" id="banner-logo">
//   *img*
// </div>
