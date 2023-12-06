// Test file for the beers DAL.

global.DEBUG = false;

// Imports
const dal = require("../auth_db");
const { getBeers } = require("../beers.dal");

describe("beers table get data", () => {
  let rowCount = 0;
  beforeAll(async () => {
    const result = await dal.query("select count(*) from beers");
    rowCount = parseInt(result.rows[0].count);
  });

  it("should return a result greater than 0", async () => {
    const result = await getBeers();
    expect(result.length).toBeGreaterThan(0);
  });
});
