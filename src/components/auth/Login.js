import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail } from "../../services/userService";
import { apodFetch } from "../../services/APODService";
import nebulaPic from "../../assets/carina-nebula-jets.png";
import saturn4 from "../../assets/saturn4.jpg";
import saturn5 from "../../assets/saturn5.png";
import saturn1 from "../../assets/saturn1.webp";

export const Login = () => {
  const [email, set] = useState("me@me.com");
  const [apodURL, setApodUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    apodFetch().then((apodObj) => {
      const APOD = apodObj.hdurl;
      setApodUrl(APOD);
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "skies_user",
          JSON.stringify({
            id: user.id,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <main className="login-container">
      <section className="login-comp">
        <form onSubmit={handleLogin}>
          <h3>Welcome to</h3>
          <div className="site-title">Dark Skies</div>
          <br></br>
          {/* <h2 className="sign-in-text">Sign in:</h2> */}
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <br></br>
          <fieldset>
            <div className="form-group">
              <button className="login-btn" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
        <br></br>
      </section>
      <div className="register-btn-container">
        <Link className="register-btn " to="/register">
          <i>Not a member yet?</i>
        </Link>
      </div>
      <img
        src={saturn5}
        alt="NASA Astronomy Pic of the Day"
        className="background-img"
      />
    </main>
  );
};
