import React from "react";
import './Details.css';

export default function Details({title, marketCap, percent}) {
    return (
        <div className="Details">
            <h1>
                {title}
            </h1>
            <div className="details-main">
                <div className="market-cap">
                    <h4>Market Capital</h4>
                    <p>Rs {marketCap}</p>
                </div>
                <div className="pe-ratio">
                    <h4>Percent</h4>
                    <p>{percent.substr(0,5)}%</p>
                </div>
            </div>
        </div>
    );
}