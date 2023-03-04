import React from "react";
import './LeaderboardItem.css';

import Logo from '../../images/company_logo.png';

export default function LeaderboardItem({title, marketValue, investors}) {
    
    return (
        <tr className="LeaderboardItem">
            <td><img src={Logo} alt="" /></td>
            <td><h2>{title}</h2></td>
            <td><h2>{marketValue}</h2></td>
            <td><h2>{investors}</h2></td>
        </tr>
    );
}