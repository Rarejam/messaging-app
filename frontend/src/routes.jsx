import App from "./App";
import FriendChat from "./components/FriendChat";
import FriendsComponent from "./components/FriendsComponent";
import GroupComponent from "./components/GroupComponent";
import Profile from "./components/Profile";
import SearchFriend from "./components/SearchFriend";
import Home from "./Home";
import HomeComponent from "./layouts/HomeComponent";
import Login from "./layouts/Login";
import Signup from "./layouts/Signup";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/home/:userId",
        element: <Home />,
        children: [
          {
            element: <HomeComponent />,
            children: [
              { index: true, element: <GroupComponent /> },
              {
                path: "profile/:userId",
                element: <Profile />,
              },
              {
                path: "friends",
                element: <FriendsComponent />,
                children: [
                  { index: true, element: <SearchFriend /> },
                  { path: "friend/:friendId", element: <FriendChat /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  //   {
  //     path: "/home",
  //     element: <Home />,
  //     children: [
  //       {
  //         index: true,
  //         element: <TopComponent />,
  //       },
  //     ],
  //   },
];

export default routes;
