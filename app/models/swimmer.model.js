module.exports = (sequelize, Sequelize) => {
    const Swimmer = sequelize.define("swimmer", {
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATEONLY
      }
    }, { 
        timestamps: false
      });
  
    return Swimmer;
  };
