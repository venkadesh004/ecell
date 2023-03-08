import React from "react";

import MainPageCompany from "../MainPageCompany/MainPageCompany";
import LeaderboardPage from "../LeaderboardPage/LeaderboardPage";

import './MainPageRenderCompany.css';
import { companies, findGrowth, marketCap, stringAmount, companyUser } from "../../constants";

import BackArrow from '../../images/back-arrow.svg';

import Stock from "../Stock/Stock";
import Portfolio from "../Portfolio/Portfolio";

export default function MainPageRenderCompany({pageIndex, searchResult, comID}) {
    if (searchResult[0] === true) {
        var output;
        companies.forEach(element => {
            if (element.id === searchResult[1]) {
                output = element;
            }
        })
        var result = findGrowth(output.investments[output.investments.length-1].amount, output.investments[output.investments.length-1].equity, output.investments[output.investments.length-2].amount, output.investments[output.investments.length-2].equity);
        var lineData = [
            ['x', 'Value']
        ];

        var i = 0;

        output.investments.forEach(invest => {
            var result = parseInt(marketCap(invest.amount, invest.equity));
            lineData.push([i+1, result]);
            i++;
        });
        return <div className="MainPageRender"><button className="stockexchange-button" onClick={() => window.location.reload(true)}><img src={BackArrow} alt="" /><h1>Back</h1></button><Stock companyName={output.name} valuation={stringAmount(marketCap(output.investments[output.investments.length-1].amount, output.investments[output.investments.length-1].equity))} growthPercent={result[1] ? "+"+result[0] : "-"+result[0]} color={result[1] ? "#41C3A9" : "#FF7972"} lineData={lineData} idea={output.idea} mark={true} /></div>;
    }
    if (pageIndex === 0) {
        return <MainPageCompany comID={comID} />;
    } else if (pageIndex === 1) {
        return <LeaderboardPage />;
    } else {
        return <Portfolio users={companyUser} />;
    }
}