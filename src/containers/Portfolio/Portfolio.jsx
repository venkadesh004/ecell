import React from "react";
import "./Portfolio.css";

import StartFirebase from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: [],
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
          });
        }
      });
    });
  };
  render() {
    console.log(this.props.users);
    console.log(this.state.company);
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
    // var data = [];
    // if (this.state.company !== []) {
    //     this.state.company.investments.forEach(element => {
    //         data.push(
    //             <div>
    //                 <p>{element.equity}</p>
    //                 <p>{element.email}</p>
    //             </div>
    //         )
    //     })
    // }
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
        {/* <div>
          <div className="pinned-heading">Equity holders</div>
          <div>{data}</div>
        </div> */}
      </div>
    );
  }
}
