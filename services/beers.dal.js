// File name: beers.dal.js
// Description: Contains the functions used to handle the requests from the beers page.
// Last modified date: 04/12/2023
// Change log: 01/12/2023 File created.
//             02/12/2023 Added get/post functions.
//             03/12/2023 Added put/patch/delete functions.
//             04/12/2023 Added additional comments.

// Import the database connection.
const dal = require("./auth_db");

// Function to get all beers from the database.
var getBeers = function () {
  if (DEBUG) console.log("beers.dal.getBeers()");
  return new Promise(function (resolve, reject) {
    // SQL query to get all beers from the beers table.
    const sql =
      "SELECT id, name, abv, ibu, category_id, brewery_id FROM public.beers2 order by id desc limit 20;";

    // Query the database using the sql query.
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

// Function to get a beer by its id. Parameter id is the id of the beer to be retrieved.
var getBeerByBeerId = function (id) {
  if (DEBUG) console.log("beers.dal.getBeerByBeerId()");
  return new Promise(function (resolve, reject) {
    // SQL query to get a beer by its id.
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

// Function to add a beer to the database. Parameters are the name, abv, ibu, category_id and brewery_id of the beer to be added.
var addBeer = function (beerName, abv, ibu, category_id, brewery_id) {
  if (DEBUG) console.log("beers.dal.addBeer()");
  return new Promise(function (resolve, reject) {
    // SQL query to add a beer to the beers table.
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

// Function to delete a beer from the database. Parameter id is the id of the beer to be deleted.
var deleteBeer = function (id) {
  if (DEBUG) console.log("beers.dal.deleteBeer()");
  return new Promise(function (resolve, reject) {
    // SQL query to delete a beer from the beers table.
    const sql = "DELETE FROM public.beers2 WHERE id = $1;";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// Function to update a beer in the database. Parameters are the id and name of the beer to be updated.
var putBeer = function (id, name) {
  if (DEBUG) console.log("beers.dal.putBeer()");
  return new Promise(function (resolve, reject) {
    // SQL query to update a beer in the beers table.
    const sql = "UPDATE public.beers2 SET name=$2  WHERE id=$1;";
    dal.query(sql, [id, name], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// Function to update a beer in the database. Parameters are the id and name of the beer to be updated.
var patchBeer = function (id, name) {
  if (DEBUG) console.log("beer.dal.patchBeer()");
  return new Promise(function (resolve, reject) {
    // SQL query to update a beer in the beers table.
    const sql = "UPDATE public.beers2 SET name=$2 WHERE id=$1;";
    dal.query(sql, [id, name], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// Export the functions.
module.exports = {
  getBeers,
  getBeerByBeerId,
  addBeer,
  deleteBeer,
  putBeer,
  patchBeer,
};
