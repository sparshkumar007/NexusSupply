import axios from "axios";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App.jsx";

if (import.meta.env.DEV) {
  console.log("Running in development mode");
  axios.defaults.baseURL = import.meta.env.VITE_LOCALHOST;
} else {
  console.log("Running in production mode");
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
}

axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
