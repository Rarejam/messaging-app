import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
          />
          <span
            style={{
              position: "absolute",
              right: "45px",
              top: "56%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "red",
              fontSize: "14px",
            }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword == true ? "hide" : "show"}
          </span>
        </div>
        <div className="form-content">
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            style={{ position: "relative" }}
            type={showConfirmPassword == true ? "text" : "password"}
            name="confirm_password"
            id="confirm_password"
            value={confirm_password}
            onChange={(e) => {
              setConfirm_password(e.target.value);
            }}
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position: "absolute",
              right: "45px",
              top: "72.3%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "red",
              fontSize: "14px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {showConfirmPassword == true ? "hide" : "show"}
          </span>
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
