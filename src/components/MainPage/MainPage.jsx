import { React, useState } from "react";
import './MainPage.css';

import CompanyBox from "../../containers/CompanyBox/CompanyBox";
import PinImage from '../../images/pin.png';
import Stock from "../Stock/Stock";

import { companies, investor, stringAmount, marketCap, findGrowth } from '../../constants';

export default function MainPage(props) {

    const [companyName, setCompanyName] = useState(companies[0].name);    
    const [valuation, setValuation] = useState(stringAmount(((companies[0].investments[companies[0].investments.length-1].amount)/(companies[0].investments[companies[0].investments.length-1].equity))*100));
    var result = findGrowth(companies[0].investments[companies[0].investments.length-1].amount, companies[0].investments[companies[0].investments.length-1].equity, companies[0].investments[companies[0].investments.length-2].amount, companies[0].investments[companies[0].investments.length-2].equity);
    const [growthPercent, setGrowthPercent] = useState(result[1] ? "+"+result[0] : "-"+result[0]);
    const [color, setColor] = useState(result[1] ? "#41C3A9" : "#FF7972");
    var marker = true;
    investor.bookmarks.forEach(inv => {
        if (inv === companies[0].id) {
            marker = false;
        }
    });
    const [mark, setMark] = useState(marker);

    var lineDataValue = [
        ['x', 'Value']
    ];

    var i = 0;

    companies[0].investments.forEach(invest => {
        var result = parseInt(marketCap(invest.amount, invest.equity));
        lineDataValue.push([i+1, result]);
        i++;
    });

    const [lineData, setLineData] = useState(lineDataValue);

    const [idea, setIdea] = useState(companies[0].idea);

    function setterFunction(companyName, valuation, growthPercent, color, lineData, idea, mark) {
        console.log(companyName, mark);
        setCompanyName(companyName);
        setValuation(valuation);
        setGrowthPercent(growthPercent);
        setColor(color);
        setLineData(lineData);
        setIdea(idea);
        setMark(mark);
    }
    var buttons = [];

    companies.forEach(element => {
        var valuation = stringAmount(((element.investments[element.investments.length-1].amount)/(element.investments[element.investments.length-1].equity))*100);
        var result = findGrowth(element.investments[element.investments.length-1].amount, element.investments[element.investments.length-1].equity, element.investments[element.investments.length-2].amount, element.investments[element.investments.length-2].equity);
        var growthPercent = result[1] ? "+"+result[0] : "-"+result[0];
        var color = result[1] ? "#41C3A9" : "#FF7972";

        var lineData = [
            ['x', 'Value']
        ];

        var i = 0;

        element.investments.forEach(invest => {
            var result = parseInt(marketCap(invest.amount, invest.equity));
            lineData.push([i+1, result]);
            i++;
        });

        var mark = true;

        investor.bookmarks.forEach(inv => {
            if (inv === element.id) {
                mark = false;
            }   
        });

        buttons.push(<button onClick={() => setterFunction(element.name, valuation, growthPercent, color, lineData, element.idea, mark)}><CompanyBox title={element.name} valuation={valuation} growthPercent={growthPercent} color={color} lineData={lineData} /></button>);
    });

    return (
        <div className="MainPage">
            <div className="pinned-heading">
                <h1>Pinned Companies</h1>
                <img src={PinImage} alt="" />
            </div>
            <div className="pin-company">
                {buttons}
            </div>
            <Stock companyName={companyName} valuation={valuation} growthPercent={growthPercent} color={color} lineData={lineData} idea={idea} mark={mark} />
        </div>
    );
}
