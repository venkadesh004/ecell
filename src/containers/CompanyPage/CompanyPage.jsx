import React, {Component} from "react";

import './CompanyPage.css';
import {CompanySidePage, Navbar, SidePage} from '../../containers';

import StartFirebase from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

export default class CompanyPage extends Component {
    constructor(props) {
        super(props);

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
        const dbRef = ref(db, "companyUsers");
    
        onValue(dbRef, (snapshot) => {
          let records = [];
          snapshot.forEach((childSnapshot) => {
            let keyName = childSnapshot.key;
            let data = childSnapshot.val();
            data = Object.values(data)[0]
            if (data.email === localStorage.getItem("email")) {
                records = data;
                // console.log("User", records);
            }
          });
          this.setState({
            tableData: records,
          });
        });
      }

    render() {
        var pageIndex = 0;

        console.log(this.state.tableData);
        console.log(this.state.tableData.comID);

    return (
            <div className="CompanyPage">
                <div className="navbar">
                    <Navbar sendData={this.sendData} user={"Company"} profileName={this.state.tableData.name} profileGender={this.state.tableData.gender} profileEmail={this.state.tableData.email}></Navbar>
                </div>
                <CompanySidePage pageIndex={pageIndex} searchResult={this.state.data} user={this.state.tableData} comID={this.state.tableData.comID}></CompanySidePage>
            </div>
        );
    }
}