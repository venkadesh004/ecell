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

var companyUser = {
    name: "Venkadesh S",
    email: "venkadesh@student.tce.edu",
    phone: "8610475929",
    gender: true,
    comID: "com1"
}

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
        "com1",
        "com3"
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
            // console.log(companies[i].id);
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

function findGrowthPercent(amount1, equity1, amount2, equity2) {
    var result = findGrowth(amount1, equity1, amount2, equity2);
    return result[1] ? "+" + result[0] : "-" + result[0];
}

function findColor(amount1, equity1, amount2, equity2) {
    var result = findGrowth(amount1, equity1, amount2, equity2);
    return result[1] ? "#41C3A9" : "#FF7972";
}

var searchResult=[false, "com1"];

function changeCompanyList(list) {
    // console.log(list, companies);
    companies = list;
    // console.log(list, companies);
}

var postUpdateBase = "https://ecell-backend-dp6q.onrender.com";

module.exports.companies = companies;
module.exports.investor = investor;
module.exports.companyUser = companyUser;
module.exports.stringAmount = stringAmount;
module.exports.marketCap = marketCap;
module.exports.findGrowth = findGrowth;
module.exports.searchResult = searchResult;
module.exports.findByID = findByID;
module.exports.findIsBookmarked = findIsBookmarked;
module.exports.removeBookmark = removeBookmark;
module.exports.addBookmark = addBookmark;
module.exports.changeCompanyList = changeCompanyList;
module.exports.findGrowthPercent = findGrowthPercent;
module.exports.findColor = findColor;
module.exports.postUpdateBase = postUpdateBase;