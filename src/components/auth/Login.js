import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail } from "../../services/userService";
import { apodFetch } from "../../services/APODService";
import nebulaPic from "../../assets/carina-nebula-jets.png";

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
    <main className="container-login">
      <section className="login-comp">
        <form className="form-login" onSubmit={handleLogin}>
          <h3>Welcome to</h3>
          <h1>[Site Name]</h1>
          <h2>Please sign in</h2>
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
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
        <div>
          <Link to="/register">Not a member yet?</Link>
        </div>
      </section>
      <img
        src={nebulaPic}
        alt="NASA Astronomy Pic of the Day"
        className="background-img"
      />
    </main>
  );
};
