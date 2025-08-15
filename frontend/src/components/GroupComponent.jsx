import axios from "axios";
import profileIcon from "../assets/profile.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GroupComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    // const interval = setInterval(async () => {

    // }, 3000);
    // return () => clearInterval(interval);
    const getMessages = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/group");
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:4000/api/group/${userId}`,
        {
          newMessage,
          userId,
        }
      );
      setMessages([...messages, res.data]);
      await axios.get(`http://localhost:4000/api/profile/${userId}`);
      // setProfile(data);
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
            <p>No messages</p>
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
                        : message.message.username || "unknown"}
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

        {/* <div className="message outgoing">
            <img src={profileIcon} alt="User" className="profile-group-pic" />
            <div className="message-body">
              <p className="sender">Me</p>
              <div className="text">
                Hey Alice! This is my reply. and also dont forget to do the
                dishes lo cuz if you dont your cooked lmao haha
              </div>
              <span className="time">4:57 PM</span>
            </div>
          </div>
        </div> */}

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
    </div>
  );
};

export default GroupComponent;
