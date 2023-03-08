import { React, Component } from "react";
import CompanyBox from "../../containers/CompanyBox/CompanyBox";
import "./WalletPage.css";

import {
  companies,
  investor,
  stringAmount,
  findGrowth,
  marketCap,
  calculateProfit,
} from "../../constants";

import Stock from "../Stock/Stock";
import BackArrow from "../../images/back-arrow.svg";

export default class WalletPage extends Component {
  constructor(props) {
    super(props);
    var mark = true;
    investor.bookmarks.forEach(comp => {
        if (companies[0].id === comp) {
            mark = false;
        }
    })
    this.state = {
      openState: this.props.presentState,
      companyName: companies[0].name,
      valuation: marketCap(
        companies[0].investments[companies[0].investments.length - 1].amount,
        companies[0].investments[companies[0].investments.length - 1].equity
      ),
      growthPercent: 0,
      color: "#FFFFFFF",
      lineData: [["x", "Value"]],
      idea: companies[0].idea,
      mark: mark
    };
  }
  render() {
    var companybox = [];
    var bookmarkBox = [];

    companies.forEach((element) => {
      var result = findGrowth(
        element.investments[element.investments.length - 1].amount,
        element.investments[element.investments.length - 1].equity,
        element.investments[element.investments.length - 2].amount,
        element.investments[element.investments.length - 2].equity
      );

      var lineData = [["x", "Value"]];

      var i = 0;

      element.investments.forEach((invest) => {
        var result = parseInt(marketCap(invest.amount, invest.equity));
        lineData.push([i + 1, result]);
        i++;
      });

      companybox.push(
        <div className="my-investments-box">
          <button
            onClick={() => {
              var result = findGrowth(
                element.investments[element.investments.length - 1].amount,
                element.investments[element.investments.length - 1].equity,
                element.investments[element.investments.length - 2].amount,
                element.investments[element.investments.length - 2].equity
              );
              var lineData = [["x", "Value"]];
              var i = 0;
              element.investments.forEach((invest) => {
                var output = parseInt(marketCap(invest.amount, invest.equity));
                lineData.push([i + 1, output]);
                i++;
              });
              var mark = true;
              investor.bookmarks.forEach(comp => {
                  if (element.id === comp) {
                    mark = false;
                  }
              });
              this.setState({
                openState: 1,
                companyName: element.name,
                valuation: marketCap(
                  element.investments[element.investments.length - 1].amount,
                  element.investments[element.investments.length - 1].equity
                ),
                growthPercent: result[1] ? "+" + result[0] : "-" + result[0],
                color: result[1] ? "#41C3A9" : "#FF7972",
                lineData: lineData,
                mark: mark
              });
            }}
          >
            <CompanyBox
              title={element.name}
              valuation={stringAmount(
                (element.investments[element.investments.length - 1].amount /
                  element.investments[element.investments.length - 1].equity) *
                  100
              )}
              growthPercent={result[1] ? "+" + result[0] : "-" + result[0]}
              color={result[1] ? "#41C3A9" : "#FF7972"}
              lineData={lineData}
            />
          </button>
        </div>
      );

      investor.bookmarks.forEach((comp) => {
        if (element.id === comp) {
          bookmarkBox.push(
            <div className="my-investments-box">
              <button
                onClick={() => {
                  var result = findGrowth(
                    element.investments[element.investments.length - 1].amount,
                    element.investments[element.investments.length - 1].equity,
                    element.investments[element.investments.length - 2].amount,
                    element.investments[element.investments.length - 2].equity
                  );
                  var lineData = [["x", "Value"]];
                  var i = 0;
                  element.investments.forEach((invest) => {
                    var output = parseInt(
                      marketCap(invest.amount, invest.equity)
                    );
                    lineData.push([i + 1, output]);
                    i++;
                  });
                  this.setState({
                    openState: 1,
                    companyName: element.name,
                    valuation: marketCap(
                      element.investments[element.investments.length - 1]
                        .amount,
                      element.investments[element.investments.length - 1].equity
                    ),
                    growthPercent: result[1]
                      ? "+" + result[0]
                      : "-" + result[0],
                    color: result[1] ? "#41C3A9" : "#FF7972",
                    lineData: lineData,
                    mark: false
                  });
                }}
              >
                <CompanyBox
                  title={element.name}
                  valuation={stringAmount(
                    (element.investments[element.investments.length - 1]
                      .amount /
                      element.investments[element.investments.length - 1]
                        .equity) *
                      100
                  )}
                  growthPercent={result[1] ? "+" + result[0] : "-" + result[0]}
                  color={result[1] ? "#41C3A9" : "#FF7972"}
                  lineData={lineData}
                />
              </button>
            </div>
          );
        }
      });
    });

    if (this.state.openState === 1) {
      return (
        <div className="WalletPage">
          <button
            className="stockexchange-button"
            onClick={() =>
              this.setState({
                openState: 0,
              })
            }
          >
            <img src={BackArrow} alt="" />
            <h1>Back</h1>
          </button>
          <Stock
            companyName={this.state.companyName}
            valuation={this.state.valuation}
            growthPercent={this.state.growthPercent}
            color={this.state.color}
            lineData={this.state.lineData}
            idea={this.state.idea}
            mark={this.state.mark}
            com={true}
          />
        </div>
      );
    }

    return (
      <div className="WalletPage">
        <div className="pinned-heading">
          <h1>Wallet</h1>
        </div>
        <div className="wallet">
          <div className="pinned-heading">
            <h1>Your Balance: </h1>
            <p>Rs {investor.balance}</p>
          </div>
          <div className="pinned-heading">
            <h1>Your Profit: </h1>
            <p>Rs {calculateProfit()}</p>
          </div>
        </div>
        <div className="pinned-heading">
          <h1>My Investments</h1>
        </div>
        <div className="my-investments">{companybox}</div>
        <div className="pinned-heading">
          <h1>My Bookmarks</h1>
        </div>
        <div className="my-investments">{bookmarkBox}</div>
      </div>
    );
  }
}
