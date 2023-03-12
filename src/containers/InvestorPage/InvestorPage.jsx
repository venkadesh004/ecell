import React, {Component} from "react";

import './InvestorPage.css';
import {Navbar, SidePage} from '../../containers';

import StartFirebase from "../firebaseConfig";
import { ref, onValue, update } from "firebase/database";

export default class InvestorPage extends Component {
    constructor(props) {
        super(props);

        console.log(props.state);

        this.state = {
            data: [false, "com1"],
            tableData: []
        };
    }

    sendData = (data) => {
        this.setState({
            data: data
        });
    };

    componentDidMount() {
        const db = StartFirebase();
        const dbRef = ref(db, "investor");
    
        onValue(dbRef, (snapshot) => {
          let records = [];
          snapshot.forEach((childSnapshot) => {
            let keyName = childSnapshot.key;
            let data = childSnapshot.val();
            if (data.email === localStorage.getItem("email")) {
                records = data;
            }
          });
          this.setState({
            tableData: records,
          });
        });
      }

    render() {
        var pageIndex = 0;

        // console.log(useLocation.state.email);
        console.log(this.state.tableData);

        return (
            <div className="InvestorPage">
                <div className="navbar">
                    <Navbar sendData={this.sendData} user={"Investor"} profileName={this.state.tableData.name} profileGender={this.state.tableData.gender} profileEmail={this.state.tableData.email}></Navbar>
                </div>
                <SidePage pageIndex={pageIndex} searchResult={this.state.data} user={this.state.tableData} ></SidePage>
            </div>
        );
    }
}