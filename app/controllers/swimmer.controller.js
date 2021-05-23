const db = require("../models");
const Swimmer = db.swimmers;
const SwimmerStats = db.swimmerStats;
const Op = db.Sequelize.Op;

// Create and Save a new Swimmer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.first_name) {
      console.log("HIIIII" + req.body.first_name)
      res.status(400).send({
        message: "Content can not be empty!!!!!!!!!!!!!!!!!"
      });
      return;
    }
  
    // Create a Swimmer
    const swimmer = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birthdate: req.body.birthdate,
      suitSize: req.body.suitSize
    }
  
    // Save Swimmer in the database
    Swimmer.create(swimmer)
      .then((swimmer) => {
        res.send(swimmer);
        console.log(">> Created swimmer: " + JSON.stringify(swimmer, null, 4));
        return swimmer;
      })
      .catch((err) => {
        console.log(">> Error while creating swimmer: ", err);
      })

      // .then(data => {
      //   res.send(data);
      // })
      // .catch(err => {
      //   res.status(500).send({
      //     message:
      //       err.message || "Some error occurred while creating the Swimmer."
      //   });
      // });
  // };

      // Create a Swimmer stats

  //   const swimmerStats = {
  //     suitSize: swimmer.suitSize,
  //     swimmerId: swimmer.Id,
  //   }
  
  // SwimmerStats.create = (swimmerStats)
  // console.log("I made it")
  //     .then((SwimmerStats) => {
  //       // res.send(swimmerStats);
  //       console.log(">> Created SwimmerStats: " + JSON.stringify(SwimmerStats, null, 4));
  //       return SwimmerStats;
  //     })
  //     .catch((err) => {
  //       console.log(">> Error while creating SwimmerStats: ", err);
  //     });


  exports.createSwimmerStats = (swimmerId, swimmerStats) => {
    return SwimmerStats.create({
      name: swimmerStats.name,
      text: swimmerStats.text,
      swimmerId: swimmerId,
    })
      .then((swimmerStats) => {
        console.log(">> Created swimmerStats: " + JSON.stringify(swimmerStats, null, 4));
        return swimmerStats;
      })
      .catch((err) => {
        console.log(">> Error while creating swimmerStats: ", err);
      });
  };

//end of method, dont delete me
    }



// Retrieve all Swimmers from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    // Swimmer.findAll({ where: condition })
    Swimmer.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving swimmers."
        });
      });
  };

// Find a single Swimmer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Swimmer.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Swimmer with id=" + id
        });
      });
  };

// Update a Swimmer by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Swimmer.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Swimmer was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Swimmer with id=${id}. Maybe Swimmer was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Swimmer with id=" + id
        });
      });
  };

// Delete a Swimmer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Swimmer.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Swimmer was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Swimmer with id=${id}. Maybe Swimmer was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Swimmer with id=" + id
        });
      });
  };

// Delete all Swimmers from the database.
exports.deleteAll = (req, res) => {
    Swimmer.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Swimmers were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all swimmers."
        });
      });
  };
// // Find all published Swimmers
// exports.findAllPublished = (req, res) => {
//     Swimmer.findAll({ where: { published: true } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving swimmers."
//         });
//       });
//   };