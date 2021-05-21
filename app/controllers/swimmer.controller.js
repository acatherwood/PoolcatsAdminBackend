const db = require("../models");
const Swimmer = db.swimmers;
const swimmerStats = db.swimmerStats;
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
      birthdate: req.body.birthdate 
    };
  
    // Save Swimmer in the database
    Swimmer.create(swimmer)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Swimmer."
        });
      });
  };

  exports.createSwimmerStats = (swimmerId, SwimmerStats) => {
    return SwimmerStats.create({
      name: SwimmerStats.name,
      text: SwimmerStats.text,
      swimmerId: swimmerId,
    })
      .then((SwimmerStats) => {
        console.log(">> Created SwimmerStats: " + JSON.stringify(SwimmerStats, null, 4));
        return SwimmerStats;
      })
      .catch((err) => {
        console.log(">> Error while creating SwimmerStats: ", err);
      });
  };

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