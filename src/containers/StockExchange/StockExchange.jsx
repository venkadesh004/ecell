import React, { Component } from "react";
import "./StockExchange.css";

import {
  stringAmount,
  marketCap,
  findGrowth,
  investor,
  companies,
  postUpdateBase
} from "../../constants";

import CompanyBox from "../../components/CompanyBox/CompanyBox";

import Stock from "../Stock/Stock";

import BackArrow from "../../images/back-arrow.svg";

import StartFirebase from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import axios from "axios";

export default class StockExchange extends Component {
  constructor(props) {
    super(props);
    var marker = true;
    investor.bookmarks.forEach((comp) => {
      if (companies[0].id === comp) {
        marker = false;
      }
    });
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
      mark: marker,
      equity: 0,
      amount: 0,
      tableData: [],
      investorDetail: [],
      remaining: 100
    };
    this.handleChangeEquity = this.handleChangeEquity.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
  }

  handleChangeEquity = (e) => {
    this.setState({
      equity: e.target.value,
    });
  };

  handleChangeAmount = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

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
        tableData: records
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
          records = data;
        }
      });
      this.setState({
        investorDetail: records,
      });
    });
  }

  render() {
    var companiesBox = [];
    var companies = this.state.tableData;
    var investor = this.state.investorDetail;
    console.log("Stockexchange", investor, this.state.remaining);

    companies.forEach((element) => {
      element = element.data;
      var valuation = stringAmount(
        (element.investments[element.investments.length - 1].amount /
        element.investments[element.investments.length - 1]
            .equity) *
          100
      );
      var result = 0;
      if (element.investments.length > 1) {
        result = findGrowth(
          element.investments[element.investments.length - 1].amount,
          element.investments[element.investments.length - 1].equity,
          element.investments[element.investments.length - 2].amount,
          element.investments[element.investments.length - 2].equity
        );
      }
      
      var growthPercent = result[1] ? "+" + result[0] : "-" + result[0];
      var color = result[1] ? "#41C3A9" : "#FF7972";

      var lineData = [["x", "Value"]];

      var i = 0;

      element.investments.forEach((invest) => {
        var result = parseInt(marketCap(invest.amount, invest.equity));
        lineData.push([i + 1, result]);
        i++;
      });

      // var remaining = element.remaining;

      companiesBox.push(
        <button
          onClick={() => {
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
              var output = parseInt(marketCap(invest.amount, invest.equity));
              lineData.push([i + 1, output]);
              i++;
            });
            
            if (investor.bookmarks !== "") {
              var marker = true;
              investor.bookmarks.forEach((comp) => {
                if (element.id === comp) {
                  marker = false;
                }
              });
            }
            var remaining = element.remaining;
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
              idea: element.idea,
              mark: marker,
              remaining: remaining
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

    if (this.state.openState === 1) {
        return (
          <div className="StockExchange">
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
              valuation={stringAmount(this.state.valuation)}
              growthPercent={this.state.growthPercent}
              color={this.state.color}
              lineData={this.state.lineData}
              idea={this.state.idea}
              mark={this.state.mark}
              com={true}
            />
            <div className="pinned-heading">
                <h1>Remaining Equity: {this.state.remaining}%</h1>
            </div>
            <div className="buy-sell">
              <div className="pinned-heading">
                <h1>Buy Equity</h1>
              </div>
              <div className="buy-values">
                <div className="buy-values-input">
                  <p style={{marginRight: "20px"}}>Amount: </p>
                  <input
                    type="number"
                    placeholder="Amount"
                    value={this.state.equity}
                    onChange={this.handleChangeEquity}
                    style={{marginRight: "40px"}}
                  />
                  <p style={{marginRight: "20px"}}>Equity: </p>
                  <input
                    type="number"
                    placeholder="Equity"
                    value={this.state.amount}
                    onChange={this.handleChangeAmount}
                  />
                </div>
                <button
                  onClick={async () => {

                    var myInv = {
                      id: "",
                      email: investor.email,
                      equity: parseInt(this.state.equity),
                      amount: parseInt(this.state.amount)
                    };

                    const api = postUpdateBase+'/addStock';
  
                    // for (var i = 0; i < companies.length; i++) {
                    //   if (companies[i].name === this.state.companyName) {
                    //     companies[i].investments.push(inv);
                    //     console.log(companies[i]);
                    //     break;
                    //   }
                    // };
  
                    await companies.forEach(element => {
                      element = element.data;
                      if (element.name === this.state.companyName) {
                        // element.investments.push(inv);
                        myInv.id = element.id;
                      }
                    });

                    console.log(myInv);

                    await axios.post(api, myInv).then((response) => {
                      console.log(response);
                      if (response.data === "No Balance") {
                        alert("Insufficient Balance")
                      } else if (response.data === "No Equity") {
                        alert("No Equity")
                      }
                    })

                    // investor.myInvestments.push(myInv);
                    // investor.balance -= parseInt(this.state.amount);
  
                    console.log(companies, investor);

                    this.setState({
                      openState: 0
                    })
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        );
    }

    return (
      <div className="StockExchange">
        <div className="pinned-heading">
          <h1>All Companies</h1>
        </div>
        <div className="all-companies">{companiesBox}</div>
      </div>
    );
  }
}
