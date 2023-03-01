import React from "react";
import './FaceProfile.css';

import FaceIcon from '../../images/face-avatar.png';

export default function FaceProfile() {
    return (
        <div className="FaceProfile">
            <div className="avatar">
                <img src={FaceIcon} alt="" />
            </div>
            <div className="user-details">
                <h2>S Venkadesh</h2>
                <p>venkadesh@student.tce.edu</p>
            </div>
        </div>
    );
}