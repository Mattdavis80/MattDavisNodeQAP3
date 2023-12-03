// File name: auth_db.js
// Description: This file contains the database connection to the dvdrental database located in the postgresql server. This information will need to be changed to match the database you are using.
// Last modified date: 3/25/2021
// Change log: 3/25/2021 file created.
// Todo: Replace hard-coded values with environment variables.

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
