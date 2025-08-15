import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
// import profileIcon from "../assets/profile.png";

const FriendsComponent = () => {
  const { friendId } = useParams();
  const [friendInfo, setFriendInfo] = useState("");
  useEffect(() => {
    const getFriend = async () => {
      const { data } = await axios.get(
        `http://localhost:4000/api/friends/${friendId}`
      );
      setFriendInfo(data);
    };
    getFriend();
  }, [friendId]);
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
