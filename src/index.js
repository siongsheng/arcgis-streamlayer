import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";

const container = <App />;

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(container);
