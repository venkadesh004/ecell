import React, {Component} from "react";

import './CompanyPage.css';
import {CompanySidePage, Navbar, SidePage} from '../../components';

export default class CompanyPage extends Component {
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
            <div className="CompanyPage">
                <div className="navbar">
                    <Navbar sendData={this.sendData} user={"Company"}></Navbar>
                </div>
                <CompanySidePage pageIndex={pageIndex} searchResult={this.state.data} comID={"com1"}></CompanySidePage>
            </div>
        );
    }
}