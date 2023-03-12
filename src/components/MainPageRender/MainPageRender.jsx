import React from "react";
import "./MainPageRender.css";

import MainPage from "../MainPage/MainPage";
import LeaderboardPage from "../LeaderboardPage/LeaderboardPage";
import WalletPage from "../WalletPage/WalletPage";
import Portfolio from "../Portfolio/Portfolio";
import StockExchange from "../StockExchange/StockExchange";
import Stock from "../Stock/Stock";

import {
  companies,
  findGrowth,
  marketCap,
  stringAmount,
} from "../../constants";

import BackArrow from "../../images/back-arrow.svg";

import StartFirebase from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

export default function MainPageRender({ pageIndex, searchResult, user }) {
  console.log(searchResult);
  if (searchResult[0] === true) {
    var output;
    var companies;
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
      companies = records;
    });
    companies.forEach((element) => {
      element = element.data;
      if (element.id === searchResult[1]) {
        output = element;
      }
    });
    var result = findGrowth(
      output.investments[output.investments.length - 1].amount,
      output.investments[output.investments.length - 1].equity,
      output.investments[output.investments.length - 2].amount,
      output.investments[output.investments.length - 2].equity
    );
    var lineData = [["x", "Value"]];

    var i = 0;

    output.investments.forEach((invest) => {
      var result = parseInt(marketCap(invest.amount, invest.equity));
      lineData.push([i + 1, result]);
      i++;
    });
    return (
      <div className="MainPageRender">
        <button
          className="stockexchange-button"
          onClick={() => window.location.reload(true)}
        >
          <img src={BackArrow} alt="" />
          <h1>Back</h1>
        </button>
        <Stock
          companyName={output.name}
          valuation={stringAmount(
            marketCap(
              output.investments[output.investments.length - 1].amount,
              output.investments[output.investments.length - 1].equity
            )
          )}
          growthPercent={result[1] ? "+" + result[0] : "-" + result[0]}
          color={result[1] ? "#41C3A9" : "#FF7972"}
          lineData={lineData}
          idea={output.idea}
          mark={true}
        />
      </div>
    );
  }
  if (pageIndex === 0) {
    return <MainPage />;
  } else if (pageIndex === 1) {
    return <LeaderboardPage />;
  } else if (pageIndex === 2) {
    return <WalletPage />;
  } else if (pageIndex === 4) {
    // console.log("In Render", user);
    return <Portfolio users={user} />;
  } else {
    return <StockExchange presentState={0} />;
  }
}
