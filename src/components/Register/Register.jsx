import React, { Component } from "react";
import "./Register.css";

import Logo from "../../images/main-logo.png";
import MaleAvatar from "../../images/face-avatar-m.png";
import FemaleAvatar from "../../images/face-avatar-f.png";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      investorColor: "#bebebe",
      companyColor: "#bebebe",
      maleColor: "#bebebe",
      femaleColor: "#bebebe",
      selected: null,
    };
  }
  render() {
    return (
      <div className="Register">
        <div className="left-col">
          <img src={Logo} alt="" />
        </div>
        <div className="right-col" onSubmit={(e) => e.preventDefault()}>
          <div className="right-col-main">
            <h1>Sign Up</h1>
            <form action="" className="register-form">
              <div className="sets-form">
                <div className="mini-groups">
                  <input type="text" placeholder="Full Name" />
                  <input type="email" placeholder="Email" />
                  <input type="text" placeholder="Phone" />
                </div>
                <div className="mini-groups-pass">
                  <input type="password" placeholder="password" />
                  <input type="password" placeholder="Confirm Password" />
                </div>
              </div>
              <textarea cols="35" rows="10" placeholder="Idea"></textarea>
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
              <div className="select-role">
                <button
                  className="avatar-select"
                  onClick={(e) => {
                    e.preventDefault();
                    if (this.state.femaleColor === "#3297FD") {
                      this.setState({
                        femaleColor: "#bebebe",
                      });
                    }
                    this.setState({
                      maleColor: "#3297FD",
                    });
                  }}
                  style={{ borderColor: this.state.maleColor }}
                >
                  <img src={MaleAvatar} alt="" />
                </button>
                <button
                  className="avatar-select"
                  onClick={(e) => {
                    e.preventDefault();
                    if (this.state.maleColor === "#3297FD") {
                      this.setState({
                        maleColor: "#bebebe",
                      });
                    }
                    this.setState({
                      femaleColor: "#3297FD",
                    });
                  }}
                  style={{ borderColor: this.state.femaleColor }}
                >
                  <img src={FemaleAvatar} alt="" />
                </button>
              </div>
              <p className="login-redirect">
                Already Have an Account? <a href="/login">Login</a>
              </p>
              <button
                className="submit"
                onClick={(e) =>
                  this.state.selected === "inv"
                    ? (window.location.href = "/investor")
                    : (window.location.href = "/company")
                }
              >
                <p>Register</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
