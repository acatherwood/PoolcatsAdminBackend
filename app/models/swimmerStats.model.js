// const { SwimmerStats, Swimmer } = require(".");

module.exports = (sequelize, DataTypes) => {
    const SwimmerStats = sequelize.define("swimmerStats", {
      suitSize: {
        type: DataTypes.INTEGER
      },
      SuitType: {
        type: DataTypes.STRING
      }
    }, { 
      timestamps: false
    })

    return SwimmerStats;
  };



