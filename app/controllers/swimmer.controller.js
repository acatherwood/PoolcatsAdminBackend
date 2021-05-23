const db = require("../models");
const Swimmer = db.swimmers;
const SwimmerStats = db.swimmerStats;


// Create and Save new Swimmers
exports.create = (swimmer) => {
  return Swimmer.create({
    first_name: swimmer.first_name,
    last_name: swimmer.last_name,
  })
    .then((swimmer) => {
      console.log(">> Created swimmer: " + JSON.stringify(swimmer, null, 4));
      return swimmer;
    })
    .catch((err) => {
      console.log(">> Error while creating swimmer: ", err);
    });
};

// Create and Save new SwimmerStats
exports.createSwimmerStat = (swimmerId, swimmerStats) => {
  return SwimmerStats.create({
    suitSize: swimmerStats.suitSize,
    swimmerId: swimmerId,
  })
    .then((swimmerStats) => {
      console.log(">> Created swimmerStat: " + JSON.stringify(swimmerStats, null, 4));
      return swimmerStats;
    })
    .catch((err) => {
      console.log(">> Error while creating swimmerStat: ", err);
    });
};

// Get the swimmerStats for a given swimmer
exports.findSwimmerById = (swimmerId) => {
  return Swimmer.findByPk(swimmerId, { include: ["swimmerStats"] })
    .then((swimmer) => {
      return swimmer;
    })
    .catch((err) => {
      console.log(">> Error while finding swimmer: ", err);
    });
};

// Get the swimmerStats for a given swimmerStat id
exports.findSwimmerStatById = (id) => {
  return SwimmerStat.findByPk(id, { include: ["swimmer"] })
    .then((swimmerStat) => {
      return swimmerStat;
    })
    .catch((err) => {
      console.log(">> Error while finding swimmerStat: ", err);
    });
};

// Get all Swimmers include swimmerStats
exports.findAll = () => {
  return Swimmer.findAll({
    include: ["swimmerStats"],
  }).then((swimmers) => {
    return swimmers;
  });
};




// Retrieve all Swimmers from the database.
exports.findAll = (req, res) => {
    // const first_name = req.query.first_name;
    // var condition = first_name ? { first_name: { [Op.iLike]: `%${first_name}%` } } : null;
  
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