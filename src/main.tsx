import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./assets/css/style.css";
import "dayjs/locale/id";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
