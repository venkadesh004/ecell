import React from "react";
import './Portfolio.css';

import { investor } from "../../constants";

export default function Portfolio() {
    return (
        <div className="Portfolio">
            <div className="details-portfolio">
                <div className="data-portfolio">
                    <h2>Full Name: </h2>
                    <p>{investor.name}</p>
                </div>
                <div className="data-portfolio">
                    <h2>Email: </h2>
                    <p>{investor.email}</p>
                </div>
                <div className="data-portfolio">
                    <h2>Phone: </h2>
                    <p>{investor.phone}</p>
                </div>
                <div className="data-portfolio">
                    <h2>Balance Remaining: </h2>
                    <p>{investor.balance} Rs</p>
                </div>
            </div>
        </div>
    );
}