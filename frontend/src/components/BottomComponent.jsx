import { Link, useParams } from "react-router-dom";
import globalIcon from "../assets/group.png";
import chatIcon from "../assets/chat.png";
import profileIcon from "../assets/profile.png";
import logoutIcon from "../assets/logout.png";

const BottomComponent = () => {
  const { userId, friendId } = useParams();
  console.log(userId, friendId);

  function handleLogout() {
    localStorage.removeItem("token");
  }
  return (
    <div className="bottom-component">
      <Link
        to={`/home/${userId}/profile/${userId}`}
        style={{
          height: "35px",
          width: "35px",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${profileIcon})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            height: "100%",
            width: "100%",
          }}
        ></div>
      </Link>
      <Link
        to={`/home/${userId}`}
        style={{
          height: "35px",
          width: "35px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundImage: `url(${globalIcon})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        ></div>
      </Link>
      <Link
        to={`/home/${userId}/friends/`}
        style={{
          height: "35px",
          width: "35px",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${chatIcon})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            height: "100%",
            width: "100%",
          }}
        ></div>
      </Link>

      <Link
        to="/"
        style={{
          height: "35px",
          width: "35px",
        }}
      >
        <div
          onClick={handleLogout}
          style={{
            backgroundImage: `url(${logoutIcon})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            height: "100%",
            width: "100%",
          }}
        ></div>
      </Link>
    </div>
  );
};

export default BottomComponent;
