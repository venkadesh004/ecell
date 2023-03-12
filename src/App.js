import "./App.css";
import { React } from "react";

import InvestorPage from "./components/InvestorPage/InvestorPage";
import CompanyPage from "./components/CompanyPage/CompanyPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Layout from './containers/Layout/Layout';
// import { RealtimeData } from "./components/realtimeData";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/register" component={<Register />}></Route>
          <Route path="/investor" component={<InvestorPage />}></Route>
          <Route path="/company" component={<CompanyPage />}></Route>
        </Route>
        </Routes>
      </Router>
    </div>
  );
}