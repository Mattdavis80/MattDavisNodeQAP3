// Breweries Data Access Layer.
// This file is used to interact with the database and gather information from the breweries table.

const dal = require("./auth_db");

//Get all breweries.
var getBreweries = function () {
  if (DEBUG) console.log("breweries.dal.getBreweries()");
  return new Promise(function (resolve, reject) {
    const sql = "SELECT * from breweries;";

    dal.query(sql, [], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err, "this is the error....");
        reject(err);
      } else {
        if (DEBUG)
          console.log("Inside the breweries.dal.getBreweries() success");
        if (DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    });
  });
};

var getBreweryById = function (id) {
  if (DEBUG) console.log("breweries.dal.getBreweryById()");
  return new Promise(function (resolve, reject) {
    const sql = "SELECT * FROM breweries WHERE id = $1";
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
  getBreweries,
  getBreweryById,
};
