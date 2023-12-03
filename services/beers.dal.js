// Beers Data Access Layer.
// This file is used to interact with the database and gather information from the beers table.

const dal = require("./auth_db");

//get all beers.
var getBeers = function () {
  if (DEBUG) console.log("beers.dal.getBeers()");
  return new Promise(function (resolve, reject) {
    const sql =
      "SELECT id, name, abv, ibu, category_id, brewery_id FROM public.beers2 order by id desc limit 20;";

    dal.query(sql, [], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err, "this is the error....");
        reject(err);
      } else {
        if (DEBUG) console.log("inside the beers.dal.getBeers() success");
        if (DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    });
  });
};

var getBeerByBeerId = function (id) {
  if (DEBUG) console.log("beers.dal.getBeerByBeerId()");
  return new Promise(function (resolve, reject) {
    const sql = "SELECT * FROM beers2 WHERE id = $1";
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

var addBeer = function (beerName, abv, ibu, category_id, brewery_id) {
  if (DEBUG) console.log("beers.dal.addBeer()");
  return new Promise(function (resolve, reject) {
    const sql =
      "INSERT INTO public.beers2(name, abv, ibu, category_id, brewery_id) \
        VALUES ($1, $2, $3, $4, $5) RETURNING id, name, abv, ibu, category_id, brewery_id;";
    dal.query(
      sql,
      [beerName, abv, ibu, category_id, brewery_id],
      (err, result) => {
        if (err) {
          if (DEBUG) console.log(err);
          reject(err);
        } else {
          if (DEBUG) console.log(`Success: New PK(${result.rows[0].id})`);
          resolve(result.rows);
        }
      }
    );
  });
};

module.exports = {
  getBeers,
  getBeerByBeerId,
  addBeer,
};
