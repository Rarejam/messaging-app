import { Link } from "react-router-dom";
import profileIcon from "../assets/profile.png";
import circleGif from "../assets/circle.gif";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchFriend = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchUser, setSearchUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function allUsers() {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://messaging-app-backend-dht1.onrender.com/api/friends",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    }
    allUsers();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://messaging-app-backend-dht1.onrender.com/api/friends",
        { searchValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchUser(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setSearchUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="friends-container">
      <div className="form-container">
        <form className="friends-search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search friend...with username"
            className="friends-search-input"
            style={{ width: "50%", fontSize: "16px" }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit">find</button>
        </form>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <img
            src={circleGif}
            alt="Loading..."
            style={{ width: "60px", height: "60px" }}
          />
        </div>
      ) : searchUser ? (
        <Link to={`friend/${searchUser.id}`} key={searchUser.id}>
          <div className="friend-card">
            <img
              src={searchUser.profile?.profileImage || profileIcon}
              alt="Friend Avatar"
              className="friend-avatar"
            />
            <div className="friend-info">
              <div className="friend-name">{searchUser.username}</div>
              <div className="friend-status">Online</div>
            </div>
          </div>
        </Link>
      ) : (
        <div>
          {users.length > 0 ? (
            users.map((user) => (
              <Link to={`friend/${user.id}`} key={user.id}>
                <div className="friend-card">
                  <img
                    src={user.profile?.profileImage || profileIcon}
                    alt="Friend Avatar"
                    className="friend-avatar"
                  />
                  <div className="friend-info">
                    <div className="friend-name">{user.username}</div>
                    <div className="friend-status">Online</div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "18px",
                color: "white",
                marginTop: "20px",
              }}
            >
              No users found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFriend;
