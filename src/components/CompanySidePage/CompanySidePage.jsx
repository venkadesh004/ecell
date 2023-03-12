import { React, Component } from "react";
import './CompanySidePage.css';

import HomeIconBlack from '../../images/homeIcon.svg';
import HomeIconGrey from '../../images/homeIcon.png';
import RankingIconBlack from '../../images/rankingBlack.png';
import RankingIconGrey from '../../images/rankingGrey.png';
import UserProfileBlack from '../../images/userProfileBlack.png';
import UserProfileGrey from '../../images/userProfileGrey.png';
import MainPageRenderCompany from "../MainPageRenderCompany/MainPageRenderCompany";

import StartFirebase from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

export default class CompanySidePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: this.props.pageIndex,
            tableData: []
        };
    }
    componentDidMount() {
        const db = StartFirebase();
        const dbRef = ref(db, "company");
    
        onValue(dbRef, (snapshot) => {
          let records = [];
          snapshot.forEach((childSnapshot) => {
            let keyName = childSnapshot.key;
            let data = childSnapshot.val();
            data = Object.values(data)[0]
            records.push({
              key: keyName,
              data: data,
            });
          });
          this.setState({
            tableData: records[0].data,
          });
        });
      }
    render() {
        console.log(this.state.pageIndex);
        return (
            <div className="CompanySidePage">
                <div className="companySidePage">
                    <div className="menuPage">
                        <h1>MAIN MENU</h1>
                        <button onClick={() => {
                            this.setState({
                                pageIndex: 0
                            });
                            this.props.pageIndex = 0;
                        }}>
                            <div className="home">
                                <img src={this.state.pageIndex === 0 ? HomeIconBlack : HomeIconGrey} alt="" />
                                <p style={this.state.pageIndex === 0 ? {color: "#000000"}: {color: "#96A0B5"}}>Home</p>
                            </div>
                        </button>
                        <button onClick={() => {
                            this.setState({
                                pageIndex: 1
                            });
                            this.props.pageIndex = 1;
                        }}>
                            <div className="home">
                                <img src={this.state.pageIndex === 1 ? RankingIconBlack : RankingIconGrey} alt="" />
                                <p style={this.state.pageIndex === 1 ? {color: "#000000"}: {color: "#96A0B5"}}>Leaderboard</p>
                            </div>
                        </button>
                    </div>
                    <div className="menuPage">
                        <h1>Portfolio</h1>
                        <button onClick={() => {
                            this.setState({
                                pageIndex: 4
                            });
                            this.props.pageIndex = 4;
                        }}>
                            <div className="home">
                                <img src={this.state.pageIndex === 4 ? UserProfileBlack : UserProfileGrey} alt="" />
                                <p style={this.state.pageIndex === 4 ? {color: "#000000"}: {color: "#96A0B5"}}>Profile</p>
                            </div>
                        </button>
                    </div>
                </div>
                <MainPageRenderCompany pageIndex={this.state.pageIndex} searchResult={this.props.searchResult} comID={this.props.comID} user={this.props.user} />
            </div>
        );
    }
}