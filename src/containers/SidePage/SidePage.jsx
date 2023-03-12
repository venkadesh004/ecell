import { React, Component } from "react";
import './SidePage.css';

import HomeIconBlack from '../../images/homeIcon.svg';
import HomeIconGrey from '../../images/homeIcon.png';
import RankingIconBlack from '../../images/rankingBlack.png';
import RankingIconGrey from '../../images/rankingGrey.png';
import WalletIconBlack from '../../images/walletIconBlack.png';
import WalletIconGrey from '../../images/walletIconGrey.png';
import UserProfileBlack from '../../images/userProfileBlack.png';
import UserProfileGrey from '../../images/userProfileGrey.png';
import MainPageRender from "../MainPageRender/MainPageRender";
import StockExchangeBlack from "../../images/stockExchangeBlack.png";
import StockExchangeGrey from "../../images/stockExchangeGrey.png";

export default class SidePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: this.props.pageIndex
        };
    }

    render() {
        // // console.log(this.state.pageIndex);
        // console.log("sidepage", this.state.tableData);

        return (
            <div className="SidePage">
                <div className="sidepage">
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
                        <button onClick={() => {
                            this.setState({
                                pageIndex: 2
                            });
                            this.props.pageIndex = 2;
                        }}>
                            <div className="home">
                                <img src={this.state.pageIndex === 2 ? WalletIconBlack : WalletIconGrey} alt="" />
                                <p style={this.state.pageIndex === 2 ? {color: "#000000"}: {color: "#96A0B5"}}>Wallet</p>
                            </div>
                        </button>
                        <button onClick={() => {
                            this.setState({
                                pageIndex: 3
                            });
                            this.props.pageIndex = 3;
                        }}>
                            <div className="home">
                                <img src={this.state.pageIndex === 3 ? StockExchangeBlack : StockExchangeGrey} alt="" />
                                <p style={this.state.pageIndex === 3 ? {color: "#000000"}: {color: "#96A0B5"}}>Equity exchange</p>
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
                <MainPageRender pageIndex={this.state.pageIndex} searchResult={this.props.searchResult} user={this.props.user} />
            </div>
        );
    }
}