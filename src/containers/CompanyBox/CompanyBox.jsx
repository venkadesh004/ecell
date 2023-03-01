import React from "react";
import './CompanyBox.css';
import Chart from 'react-google-charts';

import LogoImage from '../../images/company_logo.png';

export default function CompanyBox({title, valuation, growthPercent, color}) {
    const LineData = [
        ['x', 'Value'],
        [1, 10],
        [2, 23],
        [3, 50],
        [4, 30],
        [5, 70],
        [6, 10],
        [7, 20],
        [8, 50],
        [9, 30],
        [10, 60]
    ];
      
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
                    <p style={color={color}}>{growthPercent}%</p>
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
                        data={LineData}
                        options={LineChartOptions}
                        className="graph-chart"
                    />
                </div>
            </div>
        </div>
    );
}