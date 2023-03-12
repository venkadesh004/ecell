import React, { Component } from "react";
import "./LeaderboardItem.css";

import Logo from "../../images/company_logo.png";
import { companies, marketCap } from "../../constants";

export default class LeaderboardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: companies[0].name,
      valuation: marketCap(
        companies[0].investments[companies[0].investments.length - 1].amount,
        companies[0].investments[companies[0].investments.length - 1].equity
      ),
      growthPercent: 0,
      color: "#FFFFFFF",
      lineData: [["x", "Value"]],
      idea: companies[0].idea,
      mark: false,
    };
  }

  render() {
    var titleContainer = (
      <button>
        <h2>{this.props.title}</h2>
      </button>
    );

    return (
      <div className="LeaderboardItem">
        <div className="contents-1">
          <img src={Logo} alt="" className="contents-1" />
        </div>
        <div className="contents-2">
          <h2>{titleContainer}</h2>
        </div>
        <div className="contents-3">
          <h2>{this.props.marketValue}</h2>
        </div>
        <div className="contents-4">
          <h2>{this.props.investors}</h2>
        </div>
      </div>
    );
  }
}
