import "./css/vars.css";
import "./css/reset.css";
import "./css/style.css";
import Component from "./class/Component.js";
import header from "./components/header.js";
import main from "./components/main.js";

Component.setRoot("app");

Component.append(header.html, main.html);
