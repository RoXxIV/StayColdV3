// import
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const db = require("./models");

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("Connexion à MongoDB réussie !");
    // initial();
  })
  .catch((err) => {
    console.log("Connexion à MongoDB échouée !");
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur StayCold API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}.`);
});
