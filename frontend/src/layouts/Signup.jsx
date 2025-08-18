import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import eyeIcon from "../assets/eye.png";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username,
      email,
      password,
      confirm_password,
    };
    try {
      const { data } = await axios.post(
        `https://messaging-app-backend-dht1.onrender.com/api/signup`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      setErr(data.message || "");
      navigate("/");
    } catch (error) {
      console.log(error);
      setErr(error.response?.data?.message);
    }
  };
  return (
    <div className="login-container">
      {/* <div className="login-content"> */}
      <form onSubmit={handleSubmit}>
        <div>SignUp</div>
        <div
          style={{
            color: "red",
            fontSize: "16px",
          }}
        >
          {err}
        </div>
        <div className="form-content">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-content">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-content">
          <label htmlFor="password">Password:</label>
          <input
            style={{ position: "relative" }}
            type={showPassword == true ? "text" : "password"}
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="nothing less than 8-digits"
            required
          />
          <img
            src={eyeIcon}
            alt="Toggle Password Visibility"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "43px",
              top: "54.5%",
              transform: "translateY(-50%)",
              width: "20px",
              height: "20px",
              cursor: "pointer",
              opacity: 0.7,
            }}
          />
        </div>

        <div className="form-content">
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            style={{ position: "relative", paddingRight: "40px" }}
            type={showConfirmPassword == true ? "text" : "password"}
            name="confirm_password"
            id="confirm_password"
            value={confirm_password}
            onChange={(e) => {
              setConfirm_password(e.target.value);
            }}
            required
          />
          <img
            src={eyeIcon}
            alt="Toggle Password Visibility"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position: "absolute",
              right: "43px",
              top: "71.5%",
              transform: "translateY(-50%)",
              width: "20px",
              height: "20px",
              cursor: "pointer",
              opacity: 0.7,
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            marginBottom: "10px",
            height: "8vh",
          }}
        >
          submit
        </button>

        <div
          style={{
            fontSize: "17px",
          }}
        >
          Already have an accout?
          <Link
            to="/"
            style={{
              color: "white",
            }}
          >
            Login
          </Link>
        </div>
      </form>
      {/* </div> */}
    </div>
  );
};

export default Signup;
