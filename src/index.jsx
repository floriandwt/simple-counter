import { render } from "solid-js/web";
import App from "./App";
import Login from "./pages/Login";
import Edit from "./pages/Edit";
import { Router, Route, Routes } from "@solidjs/router";
import "./index.css";

render(
  () => (
    <Router>
      <Routes>
        <Route path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/edit" component={Edit} />
      </Routes>
    </Router>
  ),
  document.getElementById("root")
);
