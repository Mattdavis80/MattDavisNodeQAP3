// File name: categories.dal.js
// Description: The file used to handle the categories page and associated routes/requests.
// Last modified date: 04/12/2023
// Change log: 01/12/2023 file created.
//             04/12/2023 added additional comments.

const dal = require("./auth_db");

//Get all Categories.
var getCategories = function () {
  if (DEBUG) console.log("categories.dal.Categories()");
  return new Promise(function (resolve, reject) {
    const sql = "SELECT * from categories;";

    dal.query(sql, [], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err, "this is the error....");
        reject(err);
      } else {
        if (DEBUG)
          console.log("Inside the categories.dal.getCategories() success");
        if (DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    });
  });
};

var getCategoryById = function (id) {
  if (DEBUG) console.log("categories.dal.getCategoryById()");
  return new Promise(function (resolve, reject) {
    const sql = "SELECT * FROM categories WHERE id = $1;";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        // logging should go here
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getCategories,
  getCategoryById,
};
