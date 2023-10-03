import "./Welcome.css";

export const Welcome = () => {
  return (
    <div className="welcome-container">
      <h2>
        <span>
          <i>
            Welcome to Dark Skies:<br></br>A localized directory for verified
            dark sky reserves. Light levels shown here use ratings from the
            Bortle scale of light pollution. <br></br>
            <br></br>Learn more at{" "}
            <span className="welcome-underline">www.darksky.org</span>
          </i>
        </span>
      </h2>
    </div>
  );
};
