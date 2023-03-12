import "./App.css";
import { React } from "react";

import InvestorPage from "./components/InvestorPage/InvestorPage";
import CompanyPage from "./components/CompanyPage/CompanyPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { RealtimeData } from "./components/realtimeData";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/investor" element={<InvestorPage />}></Route>
          <Route exact path="/company" element={<CompanyPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}