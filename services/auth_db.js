// File name: auth_db.js
// Description: This file contains the database connection to the dvdrental database located in the postgresql server. This information will need to be changed to match the database you are using.
// Last modified date: 29/11/2023
// Change log:         03/25/2023  File created.
//                     04/12/2023  Added additional comments.

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "breweries",
  password: "seasky",
  port: 5433,
});

// Export the pool object so that it can be used in other modules.
module.exports = pool;
