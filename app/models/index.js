const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.swimmers = require("../models/swimmer.model.js")(sequelize, Sequelize);

db.swimmerStats = require("../models/swimmerStats.model.js")(sequelize, Sequelize);

db.swimmers.hasMany(db.swimmerStats, { as: "comments" });
db.swimmerStats.belongsTo(db.swimmers, {
  foreignKey: "swimmerId",
  as: "swimmer",
});

module.exports = db;