import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchFriend = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchUser, setSearchUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function allUsers() {
      try {
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
      }
    }
    allUsers();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://messaging-app-backend-dht1.onrender.com/api/friends",
        { searchValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setSearchUser(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
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

      <div>{error}</div>

      {searchUser ? (
        <Link to={`friend/${searchUser.id}`} key={searchUser.id}>
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
        <div>
          {users.length > 0 ? (
            users.map((user) => (
              <Link to={`friend/${user.id}`} key={user.id}>
                <div className="friend-card">
                  <img
                    src={user.profile?.profileImage}
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
                fontSize: "24px",
                color: "white",
              }}
            >
              No user
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFriend;
