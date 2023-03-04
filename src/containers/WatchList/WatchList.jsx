import React, { Component } from "react";
import './WatchList.css';
import Chart from 'react-google-charts';

import CompanyLogo from '../../images/company_logo.png';
import BookMarkFill from '../../images/bookmark-fill.png';
import BookMarkUnFill from '../../images/bookmark-unfill.png';

export default class WatchList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: true
        }        
    }
    render() {
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
                title: "Market Cap",
                gridlines: {
                    color: '#E8EDF6'
                },
                textStyle: {
                    color: "#96A0B5"
                },
            },
            hAxis: {
                title: "Time",
                gridlines: {
                    color: 'transparent'
                },
                textStyle: {
                    color: "#96A0B5"
                },
            },
            series: {
              0: { color: this.props.color, lineWidth: 4 },
            },
            legend: {
                position: 'none'
            },
        };  

        return (
            <div className="WatchList">
                <div className="watchlist-heading">
                    <div className="watchlist-companyname">
                        <img src={CompanyLogo} alt="" />
                        <h1>{this.props.companyName}</h1>
                    </div>
                    <div className="watchlist-heading-amount">
                        <div className="amount">
                            <button onClick={() => {
                                if (this.state.selected === true) {
                                    this.setState({
                                        selected: false
                                    })
                                } else {
                                    this.setState({
                                        selected: true
                                    })
                                }
                            }}><img src={this.state.selected ? BookMarkUnFill : BookMarkFill} alt="" /></button>
                            <h2>{this.props.valuation}</h2>
                            <p style={this.props.color === "#41C3A9" ? {backgroundColor: "#EEFBF5", color: "#41C3A9"} : {backgroundColor: "#FFE9E8", color: this.props.color}}>{this.props.change}%</p>    
                        </div>
                        <p>Mar 13, 10:30:23 AM UTC-4</p>                        
                    </div>
                </div>
                <Chart
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={this.props.lineData}
                    options={LineChartOptions}
                    className="watchlist-chart"
                />
            </div>
        );
    }
}