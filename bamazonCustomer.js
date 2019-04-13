var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  //   connection.end();
  runInventory();
});
// Displays list of inventory and price for purchse
function runInventory() {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    if (err) {
      throw err;
    }
    for (i = 0; i < res.length; i++) {
      remainingInventory = res;
      console.log(
        `Item: ${res[i].item_id} | ${res[i].product} | Price: ${
          res[i].price
        } | Remaining Stock: ${res[i].stock_quantity}`
      );
    }
    purchase();
  });
}
//Function with allows user to pick items and quantity for purchase.
function purchase() {
  inquirer
    .prompt({
      name: "purchase",
      type: "input",
      message: "Which item number would you like to buy?"
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (Number.isInteger(parseFloat(answer.purchase)) === true) {
        const item = answer.purchase;
        //if item number is selected allows user to pick quantity. would also like to verif
        inquirer
          .prompt({
            name: "quantity",
            type: "input",
            message: "How many would you like?"
          })
          .then(function(answer) {
            var query =
              "SELECT product, stock_quantity, price FROM bamazon_db.products WHERE ?";
            connection.query(query, { item_id: item }, function(err, res) {
              console.log(res);
              var purchaseAmount = parseFloat(answer.quantity);
              var stockLeft = res[0].stock_quantity;
              var total = res[0].price * purchaseAmount;

              console.log(stockLeft);
              console.log(purchaseAmount);

              if (purchaseAmount > stockLeft) {
                console.log("not enough inventory");
              } else {
                const removeInventory =
                  "UPDATE products SET stock_quantity = stock_quantity - " +
                  purchaseAmount +
                  " WHERE ?";
                connection.query(removeInventory, { item_id: item });

                console.log(
                  `You have purchased ${purchaseAmount} of ${
                    res[0].product
                  } for $${total}.`
                );
              }
            });
          });
      } else {
        console.log("-------------------------------------");
        console.log("Please select item by listed item number");
        purchase();
      }
    });
}
