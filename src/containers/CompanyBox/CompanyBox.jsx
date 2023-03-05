import React from "react";
import './CompanyBox.css';
import Chart from 'react-google-charts';

import LogoImage from '../../images/company_logo.png';

import { companies } from "../../constants";

export default function CompanyBox({title, valuation, growthPercent, color, lineData}) {
    const LineChartOptions = {
        vAxis: {
            textPosition: 'none',
            gridlines: {
                color: 'transparent'
            }
        },
        hAxis: {
            textPosition: 'none',
            gridlines: {
                color: 'transparent'
            }
        },
        series: {
          0: { color: color },
        },
        legend: {
            position: 'none'
        },
        chartArea: {
            outline: 'none'
        },
    };      

    return (
        <div className="CompanyBox">
            <div className="logo">
                <img src={LogoImage} alt="" />
                <div className="heading">
                    <h1>{title}</h1>
                    <p style={color={color}}>{growthPercent.substr(0, 5)}%</p>
                </div>
            </div>
            <div className="portfolio">
                <div className="data">
                    <h3>Portfolio</h3>
                    <p>{valuation}</p>
                </div>
                <div className="graph">
                    <Chart
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={lineData}
                        options={LineChartOptions}
                        className="graph-chart"
                    />
                </div>
            </div>
        </div>
    );
}