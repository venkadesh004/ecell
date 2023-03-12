import { React, Component } from "react";
import Logo from "../../components/Logo/Logo";
import BellIcon from "../../components/BellIcon/BellIcon";
import FaceProfile from "../../components/FaceProfile/FaceProfile";

import "./Navbar.css";

// import { companies } from "../../constants";

import StartFirebase from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import { companies } from "../../constants";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      find: false,
      output: "com1",
      companies: []
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

  checkResult = async () => {
    console.log(this.state.companies, this.state.searchInput);
    if (this.state.searchInput.length > 0) {
      for(var i=0; i<this.state.companies.length; i++) {
        console.log(this.state.companies[i].data, this.state.searchInput);
        if ((this.state.companies[i].data.name).toLowerCase() === (this.state.searchInput).toLowerCase()) {
          this.chageState();
          this.setState({
            output: this.state.companies[i].data.id
          })
          break;
        }
      }
    }
  }

  componentDidMount() {
    var db = StartFirebase();
    const dbRef = ref(db, "company");

    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        data = Object.values(data)[0];
        records.push({
          key: keyName,
          data: data,
        });
      });
      this.setState({
        companies: records,
      });
    });
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
        <Logo user={this.props.user} />
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
          <FaceProfile name={this.props.profileName} gender={this.props.profileGender} email={this.props.profileEmail} />
        </div>
      </div>
    );
  }
}
