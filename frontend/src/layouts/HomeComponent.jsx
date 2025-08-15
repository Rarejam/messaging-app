import { Outlet } from "react-router-dom";
import BottomComponent from "../components/BottomComponent";

const HomeComponent = () => {
  return (
    <div className="top-component">
      <Outlet />
      <BottomComponent />

      {/* <div className="top-component">
        <div>left component</div>
        <div>right component</div>
      </div>
      <div className="buttom-component">button component</div> */}
    </div>
  );
};

export default HomeComponent;
