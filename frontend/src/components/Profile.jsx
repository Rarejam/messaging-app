import { useParams } from "react-router-dom";
// import profileIcon from "../assets/profile.png";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/profile/${userId}`
        );
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    getUserProfile();
  }, [userId]);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading profile...</p>;
  }

  if (!profile) {
    return <p style={{ padding: "20px" }}>Profile not found</p>;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:4000/api/profile/${userId}`, {
        inputUrl,
        bio: "this is my bio",
      });
      const { data } = await axios.get(
        `http://localhost:4000/api/profile/${userId}`
      );
      setProfile(data);
      setInputUrl("");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="top-component">
      <div className="group-container">
        <div className="group-header">Profile</div>
        <div className="group-content">
          <div className="profile-container">
            <div
              className="profile-pic"
              style={{
                backgroundImage: `url(${
                  profile?.profile?.profileImage || inputUrl
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>

            <div
              className="profile-image-input"
              style={{ marginTop: "10px", textAlign: "center" }}
            >
              <form
                onSubmit={handleSubmit}
                style={{
                  border: "none",
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "transparent",
                }}
              >
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  style={{
                    padding: "6px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    width: "200px",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    marginLeft: "6px",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "4px",
                    backgroundColor: "#007bff",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Update
                </button>
              </form>
            </div>

            <div className="profile-info">
              <h2 className="profile-name">{profile?.username}</h2>
              <p className="profile-status">Online</p>
              <p className="profile-description">
                Passionate about coding, exploring new technologies, and
                building creative projects with style.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
