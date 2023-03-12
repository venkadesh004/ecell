import { React, Component } from "react";
import CompanyBox from "../../components/CompanyBox/CompanyBox";
import "./WalletPage.css";

import {
  companies,
  investor,
  stringAmount,
  findGrowth,
  marketCap,
} from "../../constants";

import Stock from "../Stock/Stock";
import BackArrow from "../../images/back-arrow.svg";

import StartFirebase from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

export default class WalletPage extends Component {
  constructor(props) {
    super(props);
    var mark = true;
    investor.bookmarks.forEach((comp) => {
      if (companies[0].id === comp) {
        mark = false;
      }
    });
    this.state = {
      openState: 0,
      companyName: companies[0].name,
      valuation: marketCap(
        companies[0].investments[companies[0].investments.length - 1].amount,
        companies[0].investments[companies[0].investments.length - 1].equity
      ),
      growthPercent: 0,
      color: "#FFFFFFF",
      lineData: [["x", "Value"]],
      idea: companies[0].idea,
      mark: mark,
      tableData: [],
      investorData: [],
    };
  }

  componentDidMount() {
    var db = StartFirebase();
    const dbRef = ref(db, "company");

    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        data = Object.values(data)[0]
        records.push({
          key: keyName,
          data: data,
        });
      });
      this.setState({
        tableData: records,
      });
    });

    db = StartFirebase();
    const dbRefNew = ref(db, "investor");

    onValue(dbRefNew, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        if (data.email === localStorage.getItem("email")) {
          console.log(data);
          records = data;
        }
      });
      this.setState({
        investorData: records,
      });
    });
  }
  render() {
    console.log(this.state.investorData);
    var companybox = [];
    var bookmarkBox = [];

    var companies = this.state.tableData;
    var investor = this.state.investorData;

    var totalProfit = 0;

    companies.forEach((element) => {
      element = element.data;
      console.log(investor.investments);
      if (investor.investments !== "") {
        investor.investments.forEach((inv) => {
          if (inv.id === element.id) {
            var eachEquityVal =
              element.investments[element.investments.length - 1].amount /
              element.investments[element.investments.length - 1].equity;
            var myInvestmentInto = inv.amount;
            var myEquity = inv.equity;

            var presentVal = myEquity * eachEquityVal;
            var profit = presentVal - myInvestmentInto;

            totalProfit += profit;
          }
        });
      }
    });

    console.log(totalProfit);

    companies.forEach((element) => {
      element = element.data;
      // console.log(element);
      var result = 0;
      if (element.investments.length > 1) {
        result = findGrowth(
          element.investments[element.investments.length - 1].amount,
          element.investments[element.investments.length - 1].equity,
          element.investments[element.investments.length - 2].amount,
          element.investments[element.investments.length - 2].equity
        );
      }

      var lineData = [["x", "Value"]];

      var i = 0;

      element.investments.forEach((invest) => {
        var result = parseInt(marketCap(invest.amount, invest.equity));
        lineData.push([i + 1, result]);
        i++;
      });

      // // console.log("Check0", this.state.investorData);

      console.log(investor.investments);
      if (investor.investments !== "") {
        investor.investments.forEach((comp) => {
          if (comp.id === element.id) {
            companybox.push(
              <div className="my-investments-box">
                <button
                  onClick={() => {
                    var result = 0;
                    if (element.investments.length > 1) {
                      result = findGrowth(
                        element.investments[element.investments.length - 1]
                          .amount,
                        element.investments[element.investments.length - 1]
                          .equity,
                        element.investments[element.investments.length - 2]
                          .amount,
                        element.investments[element.investments.length - 2].equity
                      );
                    }
                    var lineData = [["x", "Value"]];
                    var i = 0;
                    element.investments.forEach((invest) => {
                      var output = parseInt(
                        marketCap(invest.amount, invest.equity)
                      );
                      lineData.push([i + 1, output]);
                      i++;
                    });
                    var mark = true;
                    if (investor.bookmarks !== "") {
                    investor.bookmarks.forEach((comp) => {
                      if (element.id === comp) {
                        mark = false;
                      }
                    });
                    }
                    this.setState({
                      openState: 1,
                      companyName: element.name,
                      valuation: marketCap(
                        element.investments[element.investments.length - 1]
                          .amount,
                        element.investments[element.investments.length - 1]
                          .equity
                      ),
                      growthPercent: result[1]
                        ? "+" + result[0]
                        : "-" + result[0],
                      color: result[1] ? "#41C3A9" : "#FF7972",
                      lineData: lineData,
                      mark: mark,
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
                    growthPercent={
                      result[1] ? "+" + result[0] : "-" + result[0]
                    }
                    color={result[1] ? "#41C3A9" : "#FF7972"}
                    lineData={lineData}
                  />
                </button>
              </div>
            );
          }
        });
      } else {
        if (companybox.length === 0) {
          companybox.push("No Investments");
        }
      }

      // // console.log("Check1", this.state.investorData);

      if (investor.bookmarks !== "") {
        console.log("Wallet page", investor.bookmarks);
        investor.bookmarks.forEach((comp) => {
          if (element.id === comp) {
            // console.log(element.id);
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
                      mark: false,
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
      } else {
        if (bookmarkBox.length === 0) {
          bookmarkBox.push("No Bookmarks");
        }
      }
    });

    // // console.log("Check2", this.state.investorData);

    if (this.state.openState === 1) {
      console.log(this.state.mark);
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

    // console.log("profit", this.calculateProfit(companies, investor));

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
            <p>Rs {totalProfit}</p>
          </div>
          <div className="pinned-heading">
            <h1>Total Amount: </h1>
            <p>Rs {totalProfit+investor.balance}</p>
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
