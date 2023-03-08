import React, {Component} from "react";

import './InvestorPage.css';
import {Navbar, SidePage} from '../../components';

export default class InvestorPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [false, "com1"]
        };
    }

    sendData = (data) => {
        this.setState({
            data: data
        });
    };

    render() {
        var pageIndex = 0;

        return (
            <div className="InvestorPage">
                <div className="navbar">
                    <Navbar sendData={this.sendData} user={"Investor"}></Navbar>
                </div>
                <SidePage pageIndex={pageIndex} searchResult={this.state.data}></SidePage>
            </div>
        );
    }
}