import "./App.css";
import { React, useState } from "react";

import InvestorPage from "./containers/InvestorPage/InvestorPage";
import CompanyPage from "./containers/CompanyPage/CompanyPage";

// import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
// import Layout from "./containers/Layout/Layout";
// import { RealtimeData } from "./components/realtimeData";

// import indexMover from './indexMover';

export default function App() {
  // console.log("IndexMover", indexMover);
  // var indexMover= 0;
  // indexMover = indexMover.indexMover;

  // localStorage.setItem("lastPage", 0);
  const [indexMover, setIndexMover] = useState(0);
  // console.log("Storage", localStorage.getItem("lastPage"))

  const updateIndex = (index) => {
    setIndexMover(index);
  }

  if (indexMover === 0) {
    return (
      <div className="App">
        <Login updateIndex={updateIndex} />
      </div>
    );
  } else if (indexMover === 1) {
    return (
      <div className="App">
        <Register updateIndex={updateIndex} />
      </div>
    );
  } else if (indexMover === 2) {
    return (
      <div className="App">
        <InvestorPage updateIndex={updateIndex} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <CompanyPage updateIndex={updateIndex} />
      </div>
    );
  }
}
