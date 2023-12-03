// File name: index.js
// Description: The main file used to execute the application.
// Last modified date: 3/29/2021
// Change log: 01/12/2023 file created.

// Import the express module.
const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // This is important!

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "John Doe" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});