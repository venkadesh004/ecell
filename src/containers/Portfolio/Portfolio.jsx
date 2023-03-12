import React from "react";
import "./Portfolio.css";

import StartFirebase from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import { stringAmount } from "../../constants";

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: [],
      flagger: 0,
      data: [],
      investor: []
    };
  }
  componentDidMount = () => {
    var db = StartFirebase();
    const dbRef = ref(db, "company");
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        data = Object.values(data)[0];
        console.log("Portfolio", data, this.props.users);
        if (data.email === this.props.users.email) {
          this.setState({
            company: data,
            flagger: 0
          });
        }
      });
    });

    db = StartFirebase();
    const dbRefNew = ref(db, "investor");
    onValue(dbRefNew, (snapshot) => {
        var records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        // data = Object.values(data)[0];
        records.push(data);
      });
      this.setState({
        investor: records,
        flagger: 0
      })
    });
  };
  render() {
    // console.log(this.props.users);
    // console.log(this.state.company);
    if (this.props.users.remaining === undefined) {
      return (
        <div className="Portfolio">
          <div className="details-portfolio">
            <div className="data-portfolio">
              <h2>Full Name: </h2>
              <p>{this.props.users.name}</p>
            </div>
            <div className="data-portfolio">
              <h2>Email: </h2>
              <p>{this.props.users.email}</p>
            </div>
            <div className="data-portfolio">
              <h2>Phone: </h2>
              <p>{this.props.users.phone}</p>
            </div>
          </div>
        </div>
      );
    }
    if (this.state.flagger === 0) {
        console.log("Investments", this.state.company.investments, this.state.investor);

        if (this.state.company.investments !== undefined) {
            var dataList = [];
            this.state.company.investments.forEach(element => {
                if (element.email !== undefined) {
                    if (this.state.investor !== []) {
                        this.state.investor.forEach(inv => {
                            if (inv.email === element.email) {
                                dataList.push(
                                    <div className="data-portfolio">
                                        <h2>{inv.name}</h2>
                                        <p>{element.equity}%</p>
                                        <p>Rs {stringAmount(element.amount)}</p>
                                    </div>
                                )
                            }
                        })
                    }
                }
                this.setState({
                    data: dataList
                })
            });
        }
        this.setState({
            flagger: 1
        })
    }
    return (
      <div className="Portfolio">
        <div className="details-portfolio">
          <div className="data-portfolio">
            <h2>Full Name: </h2>
            <p>{this.props.users.name}</p>
          </div>
          <div className="data-portfolio">
            <h2>Email: </h2>
            <p>{this.props.users.email}</p>
          </div>
          <div className="data-portfolio">
            <h2>Phone: </h2>
            <p>{this.props.users.phone}</p>
          </div>
          <div className="data-portfolio">
            <h2>AVailable Equity: </h2>
            <p>{this.props.users.remaining}%</p>
          </div>
        </div>
        <div>
          <div className="pinned-heading"><h1>Equity holders</h1></div>
          <div className="details-portfolio" style={{paddingTop: "5px"}}>{this.state.data}</div>
        </div>
      </div>
    );
  }
}
