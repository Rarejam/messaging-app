import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [err, setErr] = useState("");
  const [login_email, setLogin_email] = useState("");
  const [login_password, setLogin_password] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { login_email, login_password };
    try {
      //post login info
      const res = await axios.post("http://localhost:4000/api/login", formData);
      const userId = res.data.user.id;

      //post bio info
      if (bio) {
        await axios.post(`http://localhost:4000/api/profile/${userId}`, {
          bio,
        });
      }
      navigate(`/home/${userId}`);
    } catch (error) {
      console.log(error);
      setErr(error.response?.data?.message);
    }
  };
  return (
    <div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div>Login</div>
          <div>{err}</div>
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
              type="password"
              name="password"
              id="password"
              value={login_password}
              onChange={(e) => setLogin_password(e.target.value)}
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
