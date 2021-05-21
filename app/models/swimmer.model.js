module.exports = (sequelize, Sequelize) => {
    const Swimmer = sequelize.define("swimmer", {

            // If don't want createdAt
      // createdAt: false,

      // // If don't want updatedAt
      // updatedAt: false,
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATE
      },
    }, { timestamps: false});
  
    return Swimmer;
  };
