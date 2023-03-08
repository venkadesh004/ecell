import React from "react";
import "./MainPageCompany.css";

import {
  companies,
  stringAmount,
  findGrowth,
  marketCap,
} from "../../constants";
import Stock from "../Stock/Stock";

export default function MainPageCompany({ comID }) {
  for (var j = 0; j < companies.length; j++) {
    if (companies[j].id === comID) {
      var companyName = companies[j].name;
      var valuation = stringAmount(
        (companies[j].investments[companies[j].investments.length - 1].amount /
          companies[j].investments[companies[j].investments.length - 1]
            .equity) *
          100
      );
      var result = findGrowth(
        companies[j].investments[companies[j].investments.length - 1].amount,
        companies[j].investments[companies[j].investments.length - 1].equity,
        companies[j].investments[companies[j].investments.length - 2].amount,
        companies[j].investments[companies[j].investments.length - 2].equity
      );
      var growthPercent = result[1] ? "+" + result[0] : "-" + result[0];
      var color = result[1] ? "#41C3A9" : "#FF7972";

      var lineDataValue = [["x", "Value"]];

      var i = 0;

      companies[j].investments.forEach((invest) => {
        var result = parseInt(marketCap(invest.amount, invest.equity));
        lineDataValue.push([i + 1, result]);
        i++;
      });

      var idea = companies[j].idea;
    }
  }

  return (
    <div className="MainPageCompany">
      <Stock
        companyName={companyName}
        valuation={valuation}
        growthPercent={growthPercent}
        color={color}
        lineData={lineDataValue}
        idea={idea}
        mark={false}
        com={false}
      />
    </div>
  );
}
