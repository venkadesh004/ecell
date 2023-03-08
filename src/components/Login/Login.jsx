import React, { Component } from "react";
import './Login.css';

// import Database from "../../Database";

import Logo from '../../images/main-logo.png';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            investorColor: "#bebebe",
            companyColor: "#bebebe",
            selected: null
        }
    }

    render() {
        return (
            <div className="Login">
                <div className="left-col">
                    <img src={Logo} alt="" />
                </div>
                <div className="right-col" onSubmit={(e) => e.preventDefault()}>
                    <form action="" className="login-form">
                        <h1>Sign In</h1>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="password" />
                        <div className="select-role">
                            <button className="investor" onClick={(e) => {
                                e.preventDefault();
                                if (this.state.companyColor === "#3297FD") {
                                    this.setState({
                                        companyColor: "#bebebe"
                                    })
                                }
                                this.setState({
                                    investorColor: "#3297FD",
                                    selected: "inv"
                                })
                            }} style={{borderColor: this.state.investorColor}}><p>Investor</p></button>
                            <button className="company" onClick={(e) => {
                                e.preventDefault();
                                if (this.state.investorColor === "#3297FD") {
                                    this.setState({
                                        investorColor: "#bebebe"
                                    })
                                }
                                this.setState({
                                    companyColor: "#3297FD",
                                    selected: "com"
                                })
                            }} style={{borderColor: this.state.companyColor}}><p>Company</p></button>
                        </div>
                        <p className="register-redirect">Don't Have an Account? <a href="/register">Register</a></p>
                        <button className="submit" onClick={e => this.state.selected === "inv" ? window.location.href='/investor' : window.location.href='/company'}><p>Login</p></button>
                    </form>
                </div>
            </div>
        );
    }
}