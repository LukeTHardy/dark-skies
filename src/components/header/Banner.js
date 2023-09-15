import "./Banner.css";

export const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-item" id="logout">
        Logout
      </div>
      <div className="banner-item" id="banner-title">
        Site Name
      </div>
      <div className="banner-item" id="banner-logo">
        *img*
      </div>
    </div>
  );
};
