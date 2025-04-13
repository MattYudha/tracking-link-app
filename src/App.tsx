import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateLink from "./pages/CreateLink";
import Dashboard from "./pages/Dashboard";
import "./styles/App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<CreateLink />} />
          <Route path="/dashboard/:trackingId" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
