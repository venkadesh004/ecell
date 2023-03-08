import React from "react";
import './Portfolio.css';

export default function Portfolio({users}) {
    return (
        <div className="Portfolio">
            <div className="details-portfolio">
                <div className="data-portfolio">
                    <h2>Full Name: </h2>
                    <p>{users.name}</p>
                </div>
                <div className="data-portfolio">
                    <h2>Email: </h2>
                    <p>{users.email}</p>
                </div>
                <div className="data-portfolio">
                    <h2>Phone: </h2>
                    <p>{users.phone}</p>
                </div>
            </div>
        </div>
    );
}