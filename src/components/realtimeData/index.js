import StartFirebase from "../firebaseConfig";
import React from "react";
import { ref, onValue } from "firebase/database";
import { changeCompanyList } from "../../constants";
import SidePage from "../SidePage/SidePage";
import InvestorPage from "../InvestorPage/InvestorPage";
// import Table from 'react-bootstrap';

const db = StartFirebase();

export class RealtimeData extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
    };
  }

  componentDidMount() {
    const dbRef = ref(db, "company");

    onValue(dbRef, async (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({
          key: keyName,
          data: data,
        });
      });
      this.setState({
        tableData: records
      })
    });
  }

  render() {
    // console.log(this.state.tableData);
    return;
  }
}
