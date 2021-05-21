module.exports = (sequelize, DataTypes) => {
    const swimmerStats = sequelize.define("swimmerStats", {
      suitSize: {
        type: DataTypes.INTEGER
      },
      SuitType: {
        type: DataTypes.STRING
      }
    });
  
    return swimmerStats;
  };