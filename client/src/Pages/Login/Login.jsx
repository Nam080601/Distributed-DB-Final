import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "App";
import "Scss/Login.scss";
import Background from "Assets/Images/Background.png";

const defaultFormData = { username: "", password: "" };

const Login = () => {
  const { user, dispatch } = useContext(UserContext);
  const [formData, setFormData] = useState(defaultFormData);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    user()
      .then((user) => {
        if (user) {
          setError("");
          navigate("/");
        }
      })
      .catch((e) => {
        setError(
          <div className="mt-2 error-login">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span className="ms-3">Username or password is incorrect</span>
          </div>
        );
      });
  }, [navigate, user]);

  const onChange = (e) => {
    setError("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError(
        <div className="mt-2 error-login">
          <i className="fa-solid fa-triangle-exclamation"></i>
          <span className="ms-3">Username or password is required</span>
        </div>
      );
    } else {
      dispatch({ type: "login", data: formData });
    }
  };

  return (
    <div
      className="limiter"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form validate-form" onSubmit={onSubmit}>
            <span className="login-form-title">Account Login</span>
            <div
              className="wrap-input validate-input"
              data-validate="Username is required"
            >
              <input
                className="input"
                type="text"
                placeholder="Username"
                name="username"
                onChange={onChange}
              />
            </div>
            <div
              className="wrap-input rs1 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input"
                type="password"
                placeholder="Password"
                name="password"
                onChange={onChange}
              />
            </div>
            {error}
            <div className="container-login-form-btn m-t-20">
              <button className="login-form-btn">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
