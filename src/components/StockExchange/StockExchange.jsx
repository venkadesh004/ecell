import React, { Component } from "react";
import "./StockExchange.css";

import { companies, stringAmount, marketCap, findGrowth, investor } from "../../constants";

import CompanyBox from "../../containers/CompanyBox/CompanyBox";

import Stock from "../Stock/Stock";

import BackArrow from '../../images/back-arrow.svg';

export default class StockExchange extends Component {

    constructor(props) {
        super(props);
        var marker = true;
        investor.bookmarks.forEach(comp => {
            if (companies[0].id === comp) {
                marker = false;
            }
        })
        this.state ={
            openState: this.props.presentState,
            companyName: companies[0].name,
            valuation: marketCap(companies[0].investments[companies[0].investments.length-1].amount, companies[0].investments[companies[0].investments.length-1].equity),
            growthPercent: 0,
            color: "#FFFFFFF",
            lineData: [['x', 'Value']],
            idea: companies[0].idea,
            mark: marker
        };
    }

  render() {
    var companiesBox = [];

    companies.forEach((element) => {
      var valuation = stringAmount(
        (companies[0].investments[companies[0].investments.length - 1].amount /
          companies[0].investments[companies[0].investments.length - 1]
            .equity) *
          100
      );
      var result = findGrowth(
        companies[0].investments[companies[0].investments.length - 1].amount,
        companies[0].investments[companies[0].investments.length - 1].equity,
        companies[0].investments[companies[0].investments.length - 2].amount,
        companies[0].investments[companies[0].investments.length - 2].equity
      );
      var growthPercent = result[1] ? "+" + result[0] : "-" + result[0];
      var color = result[1] ? "#41C3A9" : "#FF7972";

      var lineData = [["x", "Value"]];

      var i = 0;

      element.investments.forEach((invest) => {
        var result = parseInt(marketCap(invest.amount, invest.equity));
        lineData.push([i + 1, result]);
        i++;
      });

      companiesBox.push(
        <button
          onClick={() => {
            var result = findGrowth(element.investments[element.investments.length-1].amount, element.investments[element.investments.length-1].equity, element.investments[element.investments.length-2].amount, element.investments[element.investments.length-2].equity);
            var lineData = [
                ['x', 'Value']
            ];
            var i = 0;
            element.investments.forEach(invest => {
                var output = parseInt(marketCap(invest.amount, invest.equity));
                lineData.push([i+1, output]);
                i++;
            });
            var marker = true;
            investor.bookmarks.forEach(comp => {
                if (element.id === comp) {
                    marker = false;
                }
            })
            this.setState({
              openState: 1,
              companyName: element.name,
              valuation: marketCap(element.investments[element.investments.length-1].amount, element.investments[element.investments.length-1].equity),
              growthPercent: result[1] ? "+"+result[0] : "-"+result[0],
              color: result[1] ? "#41C3A9" : "#FF7972",
                lineData: lineData,
                mark: marker
            });
          }}
        >
          <div className="companyBox">
            <CompanyBox
              title={element.name}
              valuation={valuation}
              growthPercent={growthPercent}
              color={color}
              lineData={lineData}
              idea={element.idea}
            />
          </div>
        </button>
      );
    });

    if (this.state.openState === 0) {
      return (
        <div className="StockExchange">
          <div className="pinned-heading">
            <h1>All Companies</h1>
          </div>
          <div className="all-companies">{companiesBox}</div>
        </div>
      );
    } else {
      return (
        <div className="StockExchange">
            <button className="stockexchange-button" onClick={() => this.setState({
                openState: 0
            })}><img src={BackArrow} alt="" /><h1>Back</h1></button>
            <Stock companyName={this.state.companyName} valuation={this.state.valuation} growthPercent={this.state.growthPercent} color={this.state.color} lineData={this.state.lineData} idea={this.state.idea} mark={this.state.mark} />
        </div>
      );
    }
  }
}
