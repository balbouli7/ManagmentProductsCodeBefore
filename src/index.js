import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ErrorBoundary>
    <App />
    </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
