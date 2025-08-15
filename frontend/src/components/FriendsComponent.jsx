import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
// import profileIcon from "../assets/profile.png";

const FriendsComponent = () => {
  const { friendId } = useParams();
  const [friendInfo, setFriendInfo] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getFriend = async () => {
      const { data } = await axios.get(
        `https://messaging-app-backend-dht1.onrender.com/api/friends/${friendId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFriendInfo(data);
    };
    getFriend();
  }, [friendId, token]);
  return (
    <div className="top-component">
      <div className="group-container">
        <div className="group-header">
          {friendInfo.username ? (
            friendInfo.username
          ) : (
            <a
              href="https://github.com/Rarejam/messaging-app"
              style={{
                color: "white",
                fontSize: "18px",
              }}
            >
              my github
            </a>
          )}
        </div>
        <div className="group-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FriendsComponent;
