import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const route = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={route} />
    {/* <App /> */}
  </StrictMode>
);
