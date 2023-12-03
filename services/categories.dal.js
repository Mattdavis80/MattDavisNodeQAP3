// Categories Data Access Layer.
// This file is used to interact with the database and gather information from the breweries table.

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
