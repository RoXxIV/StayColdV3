// import
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur StayCold API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}.`);
});
