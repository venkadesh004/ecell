import React from "react";
import "./LeaderboardPage.css";

import LeaderboardItem from "../../containers/LeaderboardItem/LeaderboardItem";

import StackLogo from "../../images/tce-logo.png";

import { companies, stringAmount, marketCap } from "../../constants";

export default function LeaderboardPage() {
  var companiesNew = companies;
  var leaderboarditem = [];

  var temp;

  var m1;
  var m2;

  var m1l;
  var m2l;

  console.log("Before: " + companiesNew);

  for (var i = 0; i < companiesNew.length - 1; i++) {
    for (var j = 0; j < companiesNew.length - i - 1; j++) {
      m1l = companiesNew[j].investments.length - 1;
      m2l = companiesNew[j + 1].investments.length - 1;
      m1 = marketCap(
        companiesNew[j].investments[m1l].amount,
        companiesNew[j].investments[m1l].equity
      );
      m2 = marketCap(
        companiesNew[j + 1].investments[m2l].amount,
        companiesNew[j + 1].investments[m2l].equity
      );
      console.log(m1, m2);
      if (m1 < m2) {
        temp = companiesNew[j];
        companiesNew[j] = companiesNew[j + 1];
        companiesNew[j + 1] = temp;
      }
    }
  }

  console.log(companiesNew);

  companiesNew.forEach((element) => {
    leaderboarditem.push(
      <LeaderboardItem
        title={element.name}
        marketValue={stringAmount(
          marketCap(
            element.investments[element.investments.length - 1].amount,
            element.investments[element.investments.length - 1].equity
          )
        )}
        investors={element.investments.length}
      />
    );
  });

  return (
    <div className="LeaderboardPage">
      <div className="pinned-heading">
        <h1>Leaderboard</h1>
      </div>
      <div className="LeaderboardContents">
        <div className="contents">
          <div className="contents-1">
            <img src={StackLogo} alt="" className="contents-1" />
          </div>
          <div className="contents-2">
            <h2 className="contents-2">Company Name</h2>
          </div>
          <div className="contents-3">
            <h2 className="contents-3">Market Value</h2>
          </div>
          <div className="contents-4">
            <h2 className="contents-4">Number of investors</h2>
          </div>
        </div>
        {leaderboarditem}
      </div>
    </div>
  );
}
