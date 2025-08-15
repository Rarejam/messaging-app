import { Link, Outlet } from "react-router-dom";
// import profileIcon from "../assets/profile.png";
import { useState } from "react";
import axios from "axios";

const SearchFriend = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchUser, setSearchUser] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://messaging-app-backend-dht1.onrender.com/api/friends",
        {
          searchValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setSearchUser(res.data);
    } catch (err) {
      setError(err.response?.data?.message);
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
            style={{
              width: "50%",
              fontSize: "16px",
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit">find</button>
        </form>
      </div>
      <div>{error}</div>
      {searchUser ? (
        <Link to={`friend/${searchUser.id}`}>
          <div className="friend-card">
            <img
              src={searchUser.profile?.profileImage}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            color: "white",
          }}
        >
          No user
        </div>
      )}
    </div>
  );
};

export default SearchFriend;
