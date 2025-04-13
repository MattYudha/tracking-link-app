import React from "react";
import ReactDOM from "react-dom"; // Ubah dari 'react-dom/client' ke 'react-dom'
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Jika kamu ingin mengukur performa aplikasi, kamu bisa menggunakan reportWebVitals
reportWebVitals();
