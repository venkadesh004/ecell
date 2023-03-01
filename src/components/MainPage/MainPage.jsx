import { React, useState, useEffect, useRef } from "react";
import './MainPage.css';

import CompanyBox from "../../containers/CompanyBox/CompanyBox";
import PinImage from '../../images/pin.png';
import WatchList from "../../containers/WatchList/WatchList";

export default function MainPage(props) {

    const [companyName, setCompanyName] = useState("ACT AI");    
    const [valuation, setValuation] = useState("12,012.12");
    const [growthPercent, setGrowthPercent] = useState("+0.06");
    const [color, setColor] = useState("#41C3A9");
    const [lineData, setLineData] = useState([['x', 'Value'],
    [1, 10],
    [2, 23],
    [3, 50],
    [4, 30],
    [5, 70],
    [6, 10],
    [7, 20],
    [8, 50],
    [9, 30],
    [10, 60]]);

    function setterFunction(companyName, valuation, growthPercent, color, lineData) {
        setCompanyName(companyName);
        setValuation(valuation);
        setGrowthPercent(growthPercent);
        setColor(color);
        setLineData(lineData);
    }

    const LineDataGroups = [
        [['x', 'Value'],
        [1, 10],
        [2, 23],
        [3, 50],
        [4, 30],
        [5, 70],
        [6, 10],
        [7, 20],
        [8, 50],
        [9, 30],
        [10, 60]],
        [['x', 'Value'],
        [1, 10],
        [2, 40],
        [3, 20],
        [4, 42],
        [5, 60],
        [6, 10],
        [7, 20],
        [8, 90],
        [9, 49],
        [10, 60]],
        [['x', 'Value'],
        [1, 10],
        [2, 23],
        [3, 50],
        [4, 30],
        [5, 70],
        [6, 10],
        [7, 20],
        [8, 50],
        [9, 30],
        [10, 60]],
        [['x', 'Value'],
        [1, 10],
        [2, 23],
        [3, 50],
        [4, 30],
        [5, 70],
        [6, 10],
        [7, 20],
        [8, 50],
        [9, 30],
        [10, 60]],
        [['x', 'Value'],
        [1, 10],
        [2, 23],
        [3, 50],
        [4, 30],
        [5, 70],
        [6, 10],
        [7, 20],
        [8, 50],
        [9, 30],
        [10, 60]],
        [['x', 'Value'],
        [1, 10],
        [2, 23],
        [3, 50],
        [4, 30],
        [5, 70],
        [6, 10],
        [7, 20],
        [8, 50],
        [9, 30],
        [10, 60]],
        [['x', 'Value'],
        [1, 10],
        [2, 23],
        [3, 50],
        [4, 30],
        [5, 70],
        [6, 10],
        [7, 20],
        [8, 50],
        [9, 30],
        [10, 60]],
        [['x', 'Value'],
        [1, 10],
        [2, 23],
        [3, 50],
        [4, 30],
        [5, 70],
        [6, 10],
        [7, 20],
        [8, 50],
        [9, 30],
        [10, 60]],
        [['x', 'Value'],
        [1, 10],
        [2, 23],
        [3, 50],
        [4, 30],
        [5, 70],
        [6, 10],
        [7, 20],
        [8, 50],
        [9, 30],
        [10, 60]],
        [['x', 'Value'],
        [1, 10],
        [2, 23],
        [3, 50],
        [4, 30],
        [5, 70],
        [6, 10],
        [7, 20],
        [8, 50],
        [9, 30],
        [10, 60]],
        [['x', 'Value'],
        [1, 10],
        [2, 23],
        [3, 50],
        [4, 30],
        [5, 70],
        [6, 10],
        [7, 20],
        [8, 50],
        [9, 30],
        [10, 60]],
        [['x', 'Value'],
        [1, 10],
        [2, 23],
        [3, 50],
        [4, 30],
        [5, 70],
        [6, 10],
        [7, 20],
        [8, 50],
        [9, 30],
        [10, 60]]
    ];

    return (
        <div className="MainPage">
            <div className="pinned-heading">
                <h1>Pinned Companies</h1>
                <img src={PinImage} alt="" />
            </div>
            <div className="pin-company">
                <button onClick={() => setterFunction("ACT AI", "12,012.12", "+0.06", '#41C3A9', LineDataGroups[0])}><CompanyBox title={"Act AI"} valuation={"12,012.12"} growthPercent={"+0.06"} color={'#41C3A9'} /></button>
                <button onClick={() => setterFunction("OpenAI", "14,012.12", "+0.06", '#41C3A9', LineDataGroups[1])}><CompanyBox title={"OpenAI"} valuation={"14,012.12"} growthPercent={"+0.06"} color={'#41C3A9'} /></button>
                <button onClick={() => setterFunction("Tesla", "10,012.12", "-0.06", '#FF7972', LineDataGroups[2])}><CompanyBox title={"Tesla"} valuation={"10,012.12"} growthPercent={"-0.06"} color={'#FF7972'} /></button>
                <button onClick={() => setterFunction("Apple", "15,012.12", "+0.06", '#41C3A9', LineDataGroups[3])}><CompanyBox title={"Apple"} valuation={"15,012.12"} growthPercent={"+0.06"} color={'#41C3A9'} /></button>
                <button onClick={() => setterFunction("Amazon", "22,012.12", "-0.06", '#FF7972', LineDataGroups[4])}><CompanyBox title={"Amazon"} valuation={"22,012.12"} growthPercent={"-0.06"} color={'#FF7972'} /></button>
                <button onClick={() => setterFunction("Google", "52,012.12", "-0.06", '#FF7972', LineDataGroups[5])}><CompanyBox title={"Google"} valuation={"52,012.12"} growthPercent={"-0.06"} color={'#FF7972'} /></button>
                <button onClick={() => setterFunction("TATA", "92,012.12", "+0.06", '#41C3A9', LineDataGroups[6])}><CompanyBox title={"TATA"} valuation={"92,012.12"} growthPercent={"+0.06"} color={'#41C3A9'} /></button>
                <button onClick={() => setterFunction("ChatGPT", "78,012.12", "-0.06", '#FF7972', LineDataGroups[7])}><CompanyBox title={"ChatGPT"} valuation={"78,012.12"} growthPercent={"-0.06"} color={'#FF7972'} /></button>
                <button onClick={() => setterFunction("Reliance", "75,012.12", "+0.06", '#41C3A9', LineDataGroups[8])}><CompanyBox title={"Reliance"} valuation={"75,012.12"} growthPercent={"+0.06"} color={'#41C3A9'} /></button>
                <button onClick={() => setterFunction("Yes Bank", "58,012.12", "-0.06", '#FF7972', LineDataGroups[9])}><CompanyBox title={"Yes Bank"} valuation={"58,012.12"} growthPercent={"-0.06"} color={'#FF7972'} /></button>
            </div>
            <div className="pinned-heading">
                <h1>Stock Watchlists</h1>
            </div>
            <WatchList companyName={companyName} valuation={valuation} change={growthPercent} color={color} lineData={lineData} />
        </div>
    );
}
