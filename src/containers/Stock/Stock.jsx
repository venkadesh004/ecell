import React from "react";
import "./Stock.css";

import WatchList from "../../components/WatchList/WatchList";
import Details from "../../components/Details/Details";

export default function Stock({companyName, valuation, growthPercent, color, lineData, idea, mark, com}) {
  // console.log(companyName, mark);
  return (
    <div style={{ display: "flex", alignItems: "start", marginTop: "20px" }} className="Stock">
      <div className="stock-watch">
        <div className="pinned-heading">
          <h1>Stock Watchlists</h1>
        </div>
        <WatchList
          companyName={companyName}
          valuation={valuation}
          change={growthPercent}
          color={color}
          lineData={lineData}
          bookmark={mark}
          com={com}
        />
      </div>
      <div>
        <div>
          <div className="pinned-heading">
            <h1>Details</h1>
          </div>
          <Details title={companyName} marketCap={valuation} percent={growthPercent} />
        </div>
        <div style={{ marginTop: "30px" }} className="description">
          <div className="pinned-heading">
            <h1>Description</h1>
          </div>
          <p className="description-idea">
            {idea}
          </p>
        </div>
      </div>
    </div>
  );
}
