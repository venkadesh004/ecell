import React from "react";
import './BellIcon.css';

import BellImage from '../../images/bell.png';

export default function BellIcon() {
    return (
        <div className="BellIcon">
            <img src={BellImage} alt="" />
        </div>
    );
}