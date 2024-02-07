//iniciamos dotenv
const { config } = require("dotenv");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const db = require("./db");
const routes = require("./routes");
const template = require("./assets/emails/template");
config();
const PORT = process.env.PORT;

const app = express();

//assets
app.use("/assets", express.static("./assets"));
//cors
app.use(cors());
//logs
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(template);
});

//rutas
routes.forEach(({ route, path }) => {
  app.use(`/api${route}`, require(`./service/${path}`));
});

//iniciamos servicio
db.connect()
  .then(async () => {
    // await initModels();
    app.listen(PORT, () => {
      console.log(`App running in port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting to the database: ${error.message}`);
  });
