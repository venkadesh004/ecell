import { React, Component } from "react";
import Logo from "../../containers/Logo/Logo";
import BellIcon from "../../containers/BellIcon/BellIcon";
import FaceProfile from "../../containers/FaceProfile/FaceProfile";

import "./Navbar.css";

import { companies } from "../../constants";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      find: false,
      output: "com1",
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      searchInput: e.target.value,
    });
  };

  chageState = () => {
    this.setState({
      find: true
    });
  };

  checkResult = () => {
    if (this.state.searchInput.length > 0) {
      for(var i=0; i<companies.length; i++) {
        if (companies[i].name === this.state.searchInput) {
          this.chageState();
          this.setState({
            output: companies[i].id
          })
          break;
        }
      }
    }
  }

  clickEvent = async () => {
    await this.checkResult();
    if (this.state.find) {
      this.props.sendData([true, this.state.output]);
    } else {
      this.props.sendData([false, this.state.output]);
    }
  }
  render() {
    return (
      <div className="Navbar">
        <Logo />
        <div className="Navbar-middle">
          <div className="SearchBar">
            <input
              type="search"
              onChange={this.handleChange}
              value={this.state.searchInput}
              placeholder="Search for companies"
              className="SearchBar-input"
            />
            <button
            onClick={this.clickEvent}
          >
            <BellIcon />
          </button>
          </div>
        </div>
        <div className="Navbar-side">
          <FaceProfile />
        </div>
      </div>
    );
  }
}
