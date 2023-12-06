// Test file for the beers DAL.

global.DEBUG = false;

// Imports
const dal = require("../auth_db");
const { getBeers } = require("../beers.dal");

describe("beers table get data", () => {
  let rowCount = 0;
  beforeAll(async () => {
    const result = await dal.query("select count(*) from beers2");
    rowCount = parseInt(result.rows[0].count);
    const testBeer = {
      name: "test",
      abv: 1,
      ibu: 1,
      category_id: 1,
      brewery_id: 1,
    };
    await dal.query(
      "insert into beers2(name, abv, ibu, category_id, brewery_id) values($1, $2, $3, $4, $5)",
      [
        testBeer.name,
        testBeer.abv,
        testBeer.ibu,
        testBeer.category_id,
        testBeer.brewery_id,
      ]
    );
  });

  it("should return a result greater than 0", async () => {
    const result = await getBeers();
    expect(result.length).toBeGreaterThan(0);
  });
});
