import React from "react";
import './FaceProfile.css';

import FaceIconM from '../../images/face-avatar-m.png';
import FaceIconF from '../../images/face-avatar-f.png';

import { investor } from "../../constants";

export default function FaceProfile() {
    return (
        <div className="FaceProfile">
            <div className="avatar">
                <img src={investor.gender ? FaceIconM : FaceIconF} alt="" />
            </div>
            <div className="user-details">
                <h2>{investor.name}</h2>
                <p>{investor.email}</p>
            </div>
        </div>
    );
}