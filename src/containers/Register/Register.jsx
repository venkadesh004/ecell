import React, { Component } from "react";
import "./Register.css";

import Logo from "../../images/main-logo.png";
import MaleAvatar from "../../images/face-avatar-m.png";
import FemaleAvatar from "../../images/face-avatar-f.png";

import axios from "axios";
import { postUpdateBase } from "../../constants";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      investorColor: "#bebebe",
      companyColor: "#bebebe",
      maleColor: "#bebebe",
      femaleColor: "#bebebe",
      selected: null,
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      idea: "",
      ideaName: "",
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handleIdea = this.handleIdea.bind(this);
    this.handleChangeIdeaName = this.handleChangeIdeaName.bind(this);
  }

  handleChangeName = (e) => {
    this.setState({
      fullName: e.target.value,
    });
  };

  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePhone = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };

  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value,
    });
  };

  handleIdea = (e) => {
    this.setState({
      idea: e.target.value,
    });
  };

  handleChangeIdeaName = (e) => {
    this.setState({
      ideaName: e.target.value,
    });
  };
  render() {
    return (
      <div className="Register">
        <div className="left-col-reg">
          <img src={Logo} alt="" />
        </div>
        <div className="right-col-reg" onSubmit={(e) => e.preventDefault()}>
          <div className="right-col-main">
            <h1>Sign Up</h1>
            <form action="" className="register-form">
              <div className="sets-form">
                <div className="mini-groups">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={this.state.fullName}
                    onChange={this.handleChangeName}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleEmail}
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={this.state.phone}
                    onChange={this.handlePhone}
                  />
                </div>
                <div className="mini-groups">
                  <input
                    type="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.handlePassword}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={this.state.confirmPassword}
                    onChange={this.handleConfirmPassword}
                  />
                  <input
                    type="text"
                    placeholder="Idea Name"
                    value={this.state.ideaName}
                    onChange={this.handleChangeIdeaName}
                  />
                </div>
              </div>
              <textarea
                cols="35"
                rows="10"
                placeholder="Idea"
                value={this.state.idea}
                onChange={this.handleIdea}
              ></textarea>
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
                Already Have an Account? <button onClick={() => {
                  this.props.updateIndex(0)
                }}>Login</button>
              </p>
              <button
                className="submit"
                onClick={(e) => {
                  if (this.state.password === this.state.confirmPassword) {
                    if (this.state.selected === "com") {
                      const postDataCompany = {
                        user: {
                          comID: "com4",
                          email: this.state.email,
                          gender:
                            this.state.maleColor === "#3297FD" ? true : false,
                          name: this.state.fullName,
                          password: this.state.password,
                          phone: this.state.phone,
                        },
                        company: {
                          id: "com4",
                          email: this.state.email,
                          creator: this.state.fullName,
                          idea: this.state.idea,
                          investments: {
                            0: {
                              equity: 1,
                              amount: 1,
                            },
                          },
                          name: this.state.ideaName,
                        },
                      };

                      // console.log(postUpdateBase);
                      const api = postUpdateBase + "/addCompanyUser";
                      // console.log(api);
                      axios.post(api, postDataCompany).then((response) => {
                        console.log(response);
                        if (response.data === "Done") {
                          this.props.updateIndex(0);
                        }
                      });
                    } else {
                      const postDataInvestor = {
                        email: this.state.email,
                        gender:
                          this.state.maleColor === "#3297FD" ? true : false,
                        name: this.state.fullName,
                        password: this.state.password,
                        phone: this.state.phone,
                        balance: 20000000,
                        bookmarks: "",
                        investments: "",
                      };

                      const api = postUpdateBase + "/addInvestor";
                      axios.post(api, postDataInvestor).then((response) => {
                        console.log(response);
                        if (response.data === "Done") {
                          this.props.updateIndex(0);
                        }
                      });
                    }
                  }

                  // this.state.selected === "inv"
                  //   ? (window.location.href = "/investor")
                  //   : (window.location.href = "/company");
                }}
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
