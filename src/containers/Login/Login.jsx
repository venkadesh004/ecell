import React, { Component } from "react";
import "./Login.css";

// import Database from "../../Database";

import Logo from "../../images/main-logo.png";
import StartFirebase from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import { indexMover } from "../../indexMover";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      investorColor: "#bebebe",
      companyColor: "#bebebe",
      selected: null,
      email: "",
      password: "",
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  checkUser(email, password) {
    if (this.state.selected === "inv") {
      var flag = 0;
      const db = StartFirebase();
      const dbRef = ref(db, "investor");

      onValue(dbRef, async (snapshot) => {
        await snapshot.forEach((childSnapshot) => {
          let keyName = childSnapshot.key;
          let data = childSnapshot.val();
          console.log(data.password, data.email, email, password);
          console.log(data.password === password, data.email === email);
          if (data.password === password && data.email === email) {
            console.log("Ok");
            flag = 1;
          }
        });
      });
      if (flag === 1) {
        localStorage.setItem("email", this.state.email);
        // indexMover.indexMover = 2;
        this.props.updateIndex(2);
      }
    } else {
      var flag = 0;
      const db = StartFirebase();
      const dbRef = ref(db, "companyUsers");

      onValue(dbRef, async (snapshot) => {
        await snapshot.forEach((childSnapshot) => {
          let keyName = childSnapshot.key;
          let data = childSnapshot.val();
          // console.log(data);
          // console.log(Object.keys(data));
          // var key = Object.keys(data)
          // console.log(key);
          // console.log(Object.values(data)[0])
          data = Object.values(data)[0]
          // console.log(data.password, data.email, email, password);
          console.log(data.password === password, data.email === email);
          if (data.password === password && data.email === email) {
            console.log("Ok");
            flag = 1;
          }
        });
      });
      if (flag === 1) {
        localStorage.setItem("email", this.state.email);
        this.props.updateIndex(3);
      }
    }
  }

  render() {
    return (
      <div className="Login">
        <div className="left-col-login">
          <img src={Logo} alt="" />
        </div>
        <div className="right-col" onSubmit={(e) => e.preventDefault()}>
          <form action="" className="login-form">
            <h1>Sign In</h1>
            <input
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChangeEmail}
            />
            <input
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
            <div className="select-role">
              <button
                className="investor"
                onClick={(e) => {
                  e.preventDefault();
                  if (this.state.companyColor === "#3297FD") {
                    this.setState({
                      companyColor: "#bebebe",
                    });
                  }
                  this.setState({
                    investorColor: "#3297FD",
                    selected: "inv",
                  });
                }}
                style={{ borderColor: this.state.investorColor }}
              >
                <p>Investor</p>
              </button>
              <button
                className="company"
                onClick={(e) => {
                  e.preventDefault();
                  if (this.state.investorColor === "#3297FD") {
                    this.setState({
                      investorColor: "#bebebe",
                    });
                  }
                  this.setState({
                    companyColor: "#3297FD",
                    selected: "com",
                  });
                }}
                style={{ borderColor: this.state.companyColor }}
              >
                <p>Company</p>
              </button>
            </div>
            <p className="register-redirect">
              Don't Have an Account? <button onClick={(e) => {
                this.props.updateIndex(1);
              }}>Register</button>
            </p>
            <button
              className="submit"
              onClick={async (e) => {
                // console.log(this.checkUser(this.state.email, this.state.password));
                await this.checkUser(this.state.email, this.state.password);
              }}
            >
              <p>Login</p>
            </button>
          </form>
        </div>
      </div>
    );
  }
}
