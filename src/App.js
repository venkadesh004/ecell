import "./App.css";
import { React, useState, Component } from "react";

import { Navbar, SidePage } from "./components";
import Database from "./Database";

import { searchResult } from "./constants";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [false, "com1"]
    }
  }

  sendData = (data) => {
    this.setState({
      data: data
    })
  };
  render() {
    var pageIndex = 0;

    console.log(searchResult);
    console.log(this.data);

    return (
      <div className="App">
        {/* <Database /> */}
        <div className="navbar">
          <Navbar sendData={this.sendData} />
        </div>
        <SidePage pageIndex={pageIndex} searchResult={this.state.data} />
      </div>
    );
  }
}
