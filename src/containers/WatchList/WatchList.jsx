import React, { Component } from "react";
import './WatchList.css';
import Chart from 'react-google-charts';

import CompanyLogo from '../../images/company_logo.png';
import BookMarkFill from '../../images/bookmark-fill.png';
import BookMarkUnFill from '../../images/bookmark-unfill.png';

import { addBookmark, findIsBookmarked, removeBookmark } from "../../constants";

export default class WatchList extends Component {
    constructor(props) {
        super(props);

        this.monthList = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

        this.state = {
            date: new Date().getDate(),
            month: this.monthList[new Date().getMonth()],
            year: new Date().getFullYear()
        }        
    }

    render() {
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

        // console.log(this.props.change.substr(0, 1)+this.props.change.substr(1, 5));
        console.log(this.state.selected, this.props.companyName);

        // var mark = this.props.bookmark;
        var mark = this.props.bookmarks;

        var bookmarks;

        if (this.props.com === true) {
            bookmarks = <button onClick={() => {
                if (mark === true) {
                    mark = false;
                    addBookmark(this.props.companyName);
                } else {
                    mark = true;
                    removeBookmark(this.props.companyName);
                }
            }}><img src={mark ? BookMarkUnFill : BookMarkFill} alt="" /></button>;
        } else {
            bookmarks = <div></div>;
        }

        return (
            <div className="WatchList">
                <div className="watchlist-heading">
                    <div className="watchlist-companyname">
                        <img src={CompanyLogo} alt="" />
                        <h1>{this.props.companyName}</h1>
                    </div>
                    <div className="watchlist-heading-amount">
                        <div className="amount">
                            {bookmarks}
                            <h2>Rs {this.props.valuation}</h2>
                            <p style={this.props.color === "#41C3A9" ? {backgroundColor: "#EEFBF5", color: "#41C3A9"} : {backgroundColor: "#FFE9E8", color: this.props.color}}>{this.props.change.substr(0, 5)}%</p>    
                        </div>
                        <p>{this.state.month} {this.state.date}, {this.state.year} UTC-4</p>                        
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