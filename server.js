/** @requires module:express */
const express = require("express");

/** @requires module:bodyPasrser */
const bodyParser = require("body-parser");

/** @requires module:dotEnv */
const dotenv = require("dotenv");

/** @requires module:cors */
const cors = require("cors");

/** @requires module:connect-history-api-fallback */
const history = require("connect-history-api-fallback");

const db = require("./models");

dotenv.config();

const app = express();

app.use(history());

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Connexion a la base de données
 */
db.mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("Connexion à MongoDB réussie !");
    require("./plugin/init-roles")();
  })
  .catch((err) => {
    console.log("Connexion à MongoDB échouée !");
    process.exit();
  });

/**
 * @param middleware
 */
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur StayCold API" });
});
/** @requires module:routes/auth */
require("./routes/auth.routes")(app);
/** @requires module:routes/user */
require("./routes/user.routes")(app);
/** @requires module:routes/bath */
require("./routes/bath.routes")(app);
/** @requires module:routes/contact */
require("./routes/contact.routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
