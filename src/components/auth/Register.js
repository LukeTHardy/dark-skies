import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { createUser, getUserByEmail } from "../../services/userService";
import saturn4 from "../../assets/saturn4.jpg";

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    name: "",
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    const newUser = { ...user };
    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "skies_user",
          JSON.stringify({
            id: createdUser.id,
            email: createdUser.email,
            name: createdUser.name,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <main className="container-login" style={{ textAlign: "center" }}>
      <section className="register-container">
        <form className="form-register" onSubmit={handleRegister}>
          {/* <h1>Dark Skies</h1> */}
          <h2>Sign up:</h2>
          <fieldset>
            <div className="form-group">
              <input
                onChange={updateUser}
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                onChange={updateUser}
                type="email"
                id="email"
                className="form-control"
                placeholder="Email address"
                required
              />
            </div>
          </fieldset>
          <br></br>
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                Register
              </button>
            </div>
          </fieldset>
        </form>
        <img
          src={saturn4}
          alt="NASA Astronomy Pic of the Day"
          className="background-img"
        />
      </section>
    </main>
  );
};
