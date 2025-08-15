//for private friend chat
import { useParams } from "react-router-dom";
import profileIcon from "../assets/profile.png";
import { useEffect, useState } from "react";
import axios from "axios";

const FriendChat = () => {
  const { userId, friendId } = useParams();
  const [messages, setMessages] = useState([]);
  const [friendInfo, setFriendInfo] = useState("");
  const [newMessage, setNewMessage] = useState("");

  //get friend info
  useEffect(() => {
    const getFriend = async () => {
      const { data } = await axios.get(
        `http://localhost:4000/api/friends/${friendId}`
      );
      setFriendInfo(data);
    };
    getFriend();
  }, [friendId]);
  //get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/private-message/${userId}/${friendId}`
        );
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  }, [userId, friendId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/private-message/${userId}/${friendId}`,
        { message: newMessage }
      );
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="friends-container"
      style={{
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        color: "white",
        fontSize: "24px",
      }}
    >
      {/* {friendInfo.username} */}
      <div className="group-content">
        {messages.length === 0 ? (
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            This is the beginninng of your legendary with {friendInfo.username}
          </p>
        ) : (
          messages.map((message) => {
            return (
              <div
                className={`message ${
                  message.senderId === parseInt(userId)
                    ? "outgoing"
                    : "incoming"
                }`}
                key={message.id}
              >
                {/* <img
                  src={profileIcon}
                  alt="User"
                  className="profile-group-pic"
                /> */}
                <div
                  style={{
                    backgroundImage: `url(${
                      message.senderId === parseInt(userId)
                        ? message.sender?.profile?.profileImage || profileIcon
                        : message.receiver?.profile?.profileImage || profileIcon
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  // src={profile?.profile?.profileImage}
                  // alt="User"
                  className="profile-group-pic"
                ></div>

                <div className="message-body">
                  <p className="sender">
                    {message.senderId === parseInt(userId)
                      ? "Me"
                      : friendInfo.username}
                  </p>
                  <div className="text">{message.content}</div>
                  <span className="time">
                    {new Date(message.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="group-chatbox">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="chat"
            id="chat"
            placeholder="type...."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
};

export default FriendChat;
