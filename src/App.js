import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import MainMenu from "./components/MainMenu";
import AddResource from "./components/AddResource";
import AddIncident from "./components/AddIncident";
import SearchResources from "./components/SearchResources";
import GenerateReport from "./components/GenerateReport";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="main-menu" element={<MainMenu />} />
        <Route exact path="/add-resource" element={<AddResource />} />
        <Route exact path="/add-incident" element={<AddIncident />} />
        <Route exact path="/search-resources" element={<SearchResources />} />
        <Route exact path="/generate-report" element={<GenerateReport />} />
      </Routes>
    </Router>
  );
}

export default App;
