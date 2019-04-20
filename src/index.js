import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./layout/App";
import "../node_modules/semantic-ui-css/semantic.min.css";
import "./style.css";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
