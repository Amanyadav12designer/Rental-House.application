import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {NotificationProvider} from "./NotificationContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>

  <NotificationProvider>
    <App />
    </NotificationProvider>
  </BrowserRouter>
);

