/* @refresh reload */
import { render } from "solid-js/web";
import { HashRouter } from "@solidjs/router";
import "./colors_and_type.css";
import "./style.css";
import App from "./App";

render(() => (
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById("app"));
