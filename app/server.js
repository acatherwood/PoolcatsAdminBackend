const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("../app/models");
const controller = require("../app/controllers/swimmer.controller");
// db.sequelize.sync();


const run = async () => {
  const tut1 = await controller.create({
    first_name: "Tut#1",
    last_name: "Tut#1 Description",
  });

  const tut2 = await controller.create({
    first_name: "Tut#2",
    last_name: "Tut#2 Description",
  });

  const swimmerStat1 = await controller.createSwimmerStat(tut1.id, {
    suitSize: "5"
  });

  await controller.createSwimmerStat(tut1.id, {
    suitSize: "8"
  });
};

// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  run();
});

db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to poolcats admin application." });
});

require("./routes/swimmer.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

