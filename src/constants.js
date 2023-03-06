var companies = [
    {
        id: "com1",
        name: "Swiggy",
        creator: "Venkadesh S",
        email: "venkadesh@student.tce.edu",
        idea: "A simple food delivery App",
        investments: [
            {
                equity: 5,
                amount: 10000
            },
            {
                equity: 10,
                amount: 30000
            },
            {
                equity: 15,
                amount: 15000
            },
            {
                equity: 20,
                amount: 50000
            },
            {
                equity: 20,
                amount: 40000
            }
        ]
    },
    {
        id: "com2",
        name: "ChatGPT",
        creator: "Dinesh kumar S",
        email: "sdineshkumar@student.tce.edu",
        idea: "AI powered Chat application with API supports for managing enoromous amount of tasks",
        investments: [
            {
                equity: 10,
                amount: 30000
            },
            {
                equity: 5,
                amount: 10000
            },
            {
                equity: 10,
                amount: 30000
            },
            {
                equity: 10,
                amount: 31000
            }
        ]
    }
];

var investor = {
    name: "Venkadesh S",
    email: "venkadesh@student.tce.edu",
    phone: "8610475929",
    balance: 920000,
    gender: true,
    myInvestments: [
        {
            id: "com1",
            equity: 20,
            amount: 30000
        },
        {
            id: "com2",
            equity: 20,
            amount: 50000
        }
    ],
    bookmarks: [
        "com1"
    ]
}

function findByID(id) {
    companies.forEach(element => {
        if (id === element.id) {
            return element;
        }
    });
}

function findIsBookmarked(companyName) {

    for (var i=0; i<companies.length; i++) {
        if (companies[i].name === companyName) {
            console.log(companies[i].id);
            for (var j=0; j<investor.bookmarks.length; j++) {
                if (companies[i].id === investor.bookmarks[j]) {
                    return false;
                }
            }
        }
    }

    return true;
}

function removeBookmark(companyName) {
    var index;
    for (var i=0; i<companies.length; i++) {
        if (companies[i].name === companyName) {
            for (var j=0; j<investor.bookmarks.length; j++) {
                if (companies[i].id === investor.bookmarks[j]) {
                    index = j;
                    break;
                }
            }
            break;
        }
    }

    investor.bookmarks.splice(index, 1);
}

function addBookmark(companyName) {
    for (var i=0; i<companies.length; i++) {
        if (companies[i].name === companyName) {
            investor.bookmarks.push(companies[i].id);
            break;
        }
    }
}

function stringAmount(amount) {
    var stringamount = "";
    var addingamount;
    if (parseInt(amount) === amount) {
      stringamount = ".00";
    } else {
      amount = parseFloat(amount).toFixed(2);
      addingamount = (amount - parseInt(amount)).toFixed(2);
      stringamount += addingamount.toString().slice(1);
    }
    amount = parseInt(amount);
    while (amount > 0) {
      var splited = amount % 1000;
      splited = splited.toString();
      if (splited.length === 1) {
        splited = "00" + splited;
      } else if (splited.length === 2) {
        splited = "0" + splited;
      }
      stringamount = "," + splited + stringamount;
      amount = parseInt(amount / 1000);
    }
    stringamount = stringamount.slice(1);
    for(var i=0; i<3; i++) {
        if (stringamount[i] !== "0") {
            break;
        }
        if (stringamount[i] === "0") {
            stringamount = stringamount.slice(i+1);
            i--;
        }
    }
    return stringamount;
}
  
function marketCap(amount, equity) {
    return parseFloat((amount / equity) * 100).toFixed(2);
}
  
function findGrowth(amount1, equity1, amount2, equity2) {
    var diff = marketCap(amount1, equity1) - marketCap(amount2, equity2);
    if (diff < 0) {
      return [((diff / marketCap(amount1, equity1)) * 100).toString(), false];
    } else {
      return [((diff / marketCap(amount2, equity2)) * 100).toString(), true];
    }
}
 
function calculateProfit() {
    var totalProfit = 0;
    investor.myInvestments.forEach(element => {
        companies.forEach(company => {
            if (element.id === company.id) {
                var eachEquityVal = (company.investments[company.investments.length-1].amount)/(company.investments[company.investments.length-1].equity);
                var myInvestmentInto = element.amount;
                var myEquity = element.equity;

                var presentVal = myEquity*eachEquityVal;
                var profit = presentVal-myInvestmentInto;
                
                totalProfit += profit;
            }
        });
    });

    return totalProfit;
}

var searchResult=[false, "com1"];

module.exports.companies = companies;
module.exports.investor = investor;
module.exports.stringAmount = stringAmount;
module.exports.marketCap = marketCap;
module.exports.findGrowth = findGrowth;
module.exports.calculateProfit = calculateProfit;
module.exports.searchResult = searchResult;
module.exports.findByID = findByID;
module.exports.findIsBookmarked = findIsBookmarked;
module.exports.removeBookmark = removeBookmark;
module.exports.addBookmark = addBookmark;