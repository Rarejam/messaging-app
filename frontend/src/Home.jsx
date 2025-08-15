import { Outlet } from "react-router-dom";
import HomeComponent from "./layouts/HomeComponent";

const Home = () => {
  return (
    <div className="home">
      {/* <HomeComponent /> */}
      <Outlet />
    </div>
  );
};

export default Home;
