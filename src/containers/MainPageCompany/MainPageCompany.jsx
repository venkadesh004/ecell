import React, { Component } from "react";
import "./MainPageCompany.css";

import {
  companies,
  stringAmount,
  findGrowth,
  marketCap,
  findGrowthPercent,
  findColor,
} from "../../constants";
import Stock from "../Stock/Stock";

import StartFirebase from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

export default class MainPageCompany extends Component {
  constructor(props) {
    super(props);
    var lineDataValue = [["x", "Value"]];
    var i = 0;
    companies[0].investments.forEach((invest) => {
      var result = parseInt(marketCap(invest.amount, invest.equity));
      lineDataValue.push([i + 1, result]);
      i++;
    });
    this.state = {
      tableData: [],
      companyName: companies[0].name,
      valuation: stringAmount(
        (companies[0].investments[companies[0].investments.length - 1].amount /
          companies[0].investments[companies[0].investments.length - 1]
            .equity) *
          100
      ),
      growthPercent: findGrowthPercent(
        companies[0].investments[companies[0].investments.length - 1].amount,
        companies[0].investments[companies[0].investments.length - 1].equity,
        companies[0].investments[companies[0].investments.length - 2].amount,
        companies[0].investments[companies[0].investments.length - 2].equity
      ),
      color: findColor(
        companies[0].investments[companies[0].investments.length - 1].amount,
        companies[0].investments[companies[0].investments.length - 1].equity,
        companies[0].investments[companies[0].investments.length - 2].amount,
        companies[0].investments[companies[0].investments.length - 2].equity
      ),
      lineData: lineDataValue,
      idea: companies[0].idea,
      flagger: 0,
    };
  }

  componentDidMount() {
    const db = StartFirebase();
    const dbRef = ref(db, "company");

    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        data = Object.values(data)[0];
        records.push({
          key: keyName,
          data: data,
        });
      });
      console.log("Records:", records);
      records.forEach(async (element) => {
        element = element.data;
        if (element.id === this.props.comID) {
          if (this.state.lineData !== element.lineData) {
            this.setState({
              flagger: 0
            })
          }
        }
      })
      this.setState({
        tableData: records,
      });
    });
  }

  setterfunction(companyName, valuation, growthPercent, color, lineData, idea) {
    this.setState({
      companyName: companyName,
      valuation: valuation,
      growthPercent: growthPercent,
      color: color,
      lineData: lineData,
      idea: idea,
    });
  }

  render() {
    var companies = this.state.tableData;
    console.log("MainPageCompany", companies);
    companies.forEach(async (element) => {
      element = element.data;
      console.log("MainPageCompany element", element);
      console.log(element.id, this.props.comID);
      if (element.id === this.props.comID) {
        var companyName = element.name;

        var valuation = stringAmount(
          (element.investments[element.investments.length - 1].amount /
            element.investments[element.investments.length - 1].equity) *
            100
        );
        var result = 0;
        var growthPercent = "+0";
        var color = "#41C3A9";

        if (element.investments.length > 1) {
          valuation = stringAmount(
            (element.investments[element.investments.length - 1].amount /
              element.investments[element.investments.length - 1].equity) *
              100
          );
          // console.log(element.investments[element.investments.length - 1].amount);
          // console.log(element.investments[element.investments.length - 1].equity);
          // console.log(element.investments[element.investments.length - 2].amount);
          // console.log(element.investments[element.investments.length - 2].equity);

          result = findGrowth(
            element.investments[element.investments.length - 1].amount,
            element.investments[element.investments.length - 1].equity,
            element.investments[element.investments.length - 2].amount,
            element.investments[element.investments.length - 2].equity
          );
          console.log(result);
          growthPercent = result[1] ? "+" + result[0] : "-" + result[0];
          color = result[1] ? "#41C3A9" : "#FF7972";
        }

        var i = 0;
        var lineDataValue = [["x", "Value"]];

        if (element.investments !== "") {
          element.investments.forEach((invest) => {
            var result = parseInt(marketCap(invest.amount, invest.equity));
            lineDataValue.push([i + 1, result]);
            i++;
          });
        }

        var idea = element.idea;

        console.log("Changing");
        console.log(this.state.lineData, lineDataValue);

        if (this.state.flagger === 0) {
          console.log("Started changing")
          this.setterfunction(
            companyName,
            valuation,
            growthPercent,
            color,
            lineDataValue,
            idea
          );
          this.setState({
            flagger: 1,
          });
        }
      }
    });

    return (
      <div className="MainPageCompany">
        <Stock
          companyName={this.state.companyName}
          valuation={this.state.valuation}
          growthPercent={this.state.growthPercent}
          color={this.state.color}
          lineData={this.state.lineData}
          idea={this.state.idea}
          mark={false}
          com={false}
        />
      </div>
    );
  }
}
