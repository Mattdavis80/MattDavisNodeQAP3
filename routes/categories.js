const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategoryById,
} = require("../services/categories.dal");

// is really http://localhost:3000/categories
router.get("/", async (req, res) => {
  if (DEBUG) console.log("categories.GET");
  try {
    let categories = await getCategories();
    if (DEBUG) console.log("inside the categories.route.GET success");
    if (DEBUG) console.log(categories);
    res.render("categories", { categories });
  } catch {
    res.render("503");
  }
});

// is really http://localhost:3000/categories/1
router.get("/:id", async (req, res) => {
  try {
    let category = await getCategoryById(req.params.id); // from postgresql
    if (category.length === 0) res.render("no record");
    else res.render("category", { category });
  } catch {
    res.render("503");
  }
});

module.exports = router;
