import axios from "axios";
import profileIcon from "../assets/profile.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GroupComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userId } = useParams();

  //get token from local storage
  const token = localStorage.getItem("token");

  useEffect(() => {
    // const interval = setInterval(async () => {

    // }, 3000);
    // return () => clearInterval(interval);
    const getMessages = async () => {
      try {
        //pass token with every request
        const res = await axios.get(
          "https://messaging-app-backend-dht1.onrender.com/api/group",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://messaging-app-backend-dht1.onrender.com/api/group`,
        {
          newMessage,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setMessages((prev) => [...prev, res.data]);

      // setMessages([...messages, res.data] || );
      await axios.get(
        `https://messaging-app-backend-dht1.onrender.com/api/group/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="top-component">
      <div className="group-container">
        <div className="group-header">Global Chat</div>

        <div className="group-content">
          {messages.length === 0 ? (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                color: "white",
              }}
            >
              No messages
            </p>
          ) : (
            messages.map((message) => {
              const isOutgoing = message.messageId === parseInt(userId); // current user
              return (
                <div
                  className={`message ${isOutgoing ? "outgoing" : "incoming"}`}
                  key={message.id}
                >
                  <div
                    style={{
                      backgroundImage: `url(${
                        message.message?.profile?.profileImage || profileIcon
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
                      {isOutgoing
                        ? "Me"
                        : message.message?.username || "unknown"}
                    </p>
                    <div className="text">{message.content}</div>
                    <span className="time">
                      {new Date(message.date).toLocaleTimeString()}
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
            <button type="submit" className="group-btn">
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupComponent;
