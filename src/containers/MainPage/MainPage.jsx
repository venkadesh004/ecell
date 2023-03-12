import { React, Component } from "react";
import "./MainPage.css";

import StartFirebase from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

import CompanyBox from "../../components/CompanyBox/CompanyBox";
import PinImage from "../../images/pin.png";
import Stock from "../Stock/Stock";

import {
  investor,
  stringAmount,
  marketCap,
  findGrowth,
  companies,
  findColor,
  findGrowthPercent,
} from "../../constants";

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    var marker = true;
    investor.bookmarks.forEach((inv) => {
      if (inv === companies[0].id) {
        marker = false;
      }
    });
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
      mark: marker,
      lineData: lineDataValue,
      idea: companies[0].idea,
      flagger: 0,
      investorDetail: []
    };
  }

  setterFunction(
    companyName,
    valuation,
    growthPercent,
    color,
    lineData,
    idea,
    mark
  ) {
    this.setState({
      companyName: companyName,
      growthPercent: growthPercent,
      valuation: valuation,
      color: color,
      lineData: lineData,
      idea: idea,
      mark: mark,
    });
  }

  componentDidMount() {
    var db = StartFirebase();
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
        records.forEach(async (element) => {
          element = element.data;
            // console.log("Checking records: ", element, this.props.comID)
            if (this.state.lineData !== element.lineData) {
              this.setState({
                flagger: 0
              })
            }
        })
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
          records = data;
        }
      });
      this.setState({
        investorDetail: records
      });
    });
  }

  render() {
    // // // console.log(this.state.tableData);
    var buttons = [];
    // var investor = this.state.investorDetail;

    this.state.tableData.forEach((element) => {
      // // // console.log(element);
      // // // console.log("Investments", element.data.investments.length);
      var valuation = stringAmount(
        (element.data.investments[element.data.investments.length - 1].amount /
          element.data.investments[element.data.investments.length - 1]
            .equity) *
          100
      );
      var result = 0;
      if (element.data.investments.length > 1) {
        result = findGrowth(
          element.data.investments[element.data.investments.length - 1].amount,
          element.data.investments[element.data.investments.length - 1].equity,
          element.data.investments[element.data.investments.length - 2].amount,
          element.data.investments[element.data.investments.length - 2].equity
        );
      }
      
      var growthPercent = result[1] ? "+" + result[0] : "-" + result[0];
      var color = result[1] ? "#41C3A9" : "#FF7972";

      // // // console.log(valuation, result, growthPercent, color);

      var lineData = [["x", "Value"]];

      var i = 0;

      element.data.investments.forEach((invest) => {
        var result = parseInt(marketCap(invest.amount, invest.equity));
        lineData.push([i + 1, result]);
        i++;
      });

      var mark = true;

      // console.log(investor);
      investor.bookmarks.forEach((inv) => {
        console.log(inv);
        if (inv === element.id) {
          mark = false;
        }
      });

      buttons.push(
        <button
          onClick={() =>
            this.setterFunction(
              element.data.name,
              valuation,
              growthPercent,
              color,
              lineData,
              element.data.idea,
              mark
            )
          }
        >
          <CompanyBox
            title={element.data.name}
            valuation={valuation}
            growthPercent={growthPercent}
            color={color}
            lineData={lineData}
          />
        </button>
      );
    });

    var companies = this.state.tableData;
    companies.forEach((element) => {
      // console.log("MainPage", element);
      element = element.data;
      // console.log(element.id, this.props.comID);
        var companyName = element.name;
        var valuation = stringAmount(
          (element.investments[element.investments.length - 1].amount /
            element.investments[element.investments.length - 1].equity) *
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

        var i = 0;
        var lineDataValue = [["x", "Value"]];

        element.investments.forEach((invest) => {
          var result = parseInt(marketCap(invest.amount, invest.equity));
          lineDataValue.push([i + 1, result]);
          i++;
        });

        var idea = element.idea;

        // console.log("companyName", this.state.companyName !== companyName);
        // console.log("valuation", this.state.valuation !== valuation);
        // console.log("growthpercent", this.state.growthPercent !== growthPercent);
        // console.log("color", this.state.color !== color);
        // console.log("lineData", this.state.lineData !== lineDataValue);
        // console.log("idea", this.state.idea !== idea);

        // if (this.state.companyName !== companyName || this.state.valuation !== valuation || this.state.growthPercent !== growthPercent || this.state.color !== color || this.state.lineData !== lineDataValue || this.state.idea !== idea) {
        //   this.setterFunction(companyName, valuation, growthPercent, color, lineDataValue, idea, false);
        // }

        var mark = true;

        investor.bookmarks.forEach((inv) => {
          if (inv === element.id) {
            mark = false;
          }
        });

        // console.log("Changing details", companyName, valuation, growthPercent, color, lineDataValue, idea, mark);

        if (this.state.flagger === 0) {
          this.setterFunction(
            companyName,
            valuation,
            growthPercent,
            color,
            lineDataValue,
            idea,
            mark
          );
          this.setState({
            flagger: 1
          })
        }
    });

    return (
      <div className="MainPage">
        <div className="pinned-heading">
          <h1>Pinned Companies</h1>
          <img src={PinImage} alt="" />
        </div>
        <div className="pin-company">{buttons}</div>
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
}
