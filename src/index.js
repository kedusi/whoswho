import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./style.css";

import App from "./components/App";

const MOUNT_NODE = document.getElementById("app");

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  MOUNT_NODE
);
