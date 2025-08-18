import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import eyeIcon from "../assets/eye.png";

const Login = () => {
  const [err, setErr] = useState("");
  const [login_email, setLogin_email] = useState("");
  const [login_password, setLogin_password] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { login_email, login_password, bio };
    try {
      setIsActive(true);
      //post login info
      const res = await axios.post(
        "https://messaging-app-backend-dht1.onrender.com/api/login",

        formData,

        { headers: { "Content-Type": "application/json" } }
      );
      console.log(res.data);
      const userId = res.data.user.id;

      // get token from succcessful login
      //store token in localStorage
      localStorage.setItem("token", res.data.token);
      navigate(`/home/${userId}`);
    } catch (error) {
      console.log(error);
      setErr(error.response?.data?.message);
    } finally {
      setIsActive(false);
    }
  };
  return (
    <div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div>Login</div>
          <div
            style={{
              fontSize: "16px",
              color: "red",
            }}
          >
            {err}
          </div>
          <div className="form-content">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={login_email}
              onChange={(e) => setLogin_email(e.target.value)}
            />
          </div>
          <div className="form-content">
            <label htmlFor="password">Password:</label>
            <input
              style={{ position: "relative", paddingRight: "40px" }}
              type={showPassword == true ? "text" : "password"}
              name="password"
              id="password"
              value={login_password}
              onChange={(e) => setLogin_password(e.target.value)}
            />
            <img
              src={eyeIcon}
              alt="Toggle Password Visibility"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "43px",
                top: "43%",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                cursor: "pointer",
                opacity: 0.7,
              }}
            />
          </div>

          <div className="form-content">
            <label htmlFor="bio">Bio*:</label>
            <textarea
              type="text"
              name="bio"
              id="bio"
              className="login-textarea"
              style={{
                height: "60px",
                resize: "none",
              }}
              placeholder="add About(optional)"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <button
            type="submit"
            style={{
              marginBottom: "10px",
              height: "8vh",
            }}
            disabled={isActive}
          >
            submit
          </button>

          <div
            style={{
              fontSize: "17px",
            }}
          >
            Don't have an accout?
            <Link
              to="/signup"
              style={{
                color: "white",
              }}
            >
              Signup
            </Link>
          </div>
        </form>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Login;
