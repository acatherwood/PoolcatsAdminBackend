module.exports = app => {
    const swimmers = require("../controllers/swimmer.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Swimmer
    router.post("/", swimmers.create);
  
    // Retrieve all Swimmers
    router.get("/", swimmers.findAll);
  
  
    // Retrieve a single Swimmer with id
    router.get("/:id", swimmers.findOne);
  
    // Update a Swimmer with id
    router.put("/:id", swimmers.update);
  
    // Delete a Swimmer with id
    router.delete("/:id", swimmers.delete);
  
    // Create a new Swimmer
    router.delete("/", swimmers.deleteAll);
  
    app.use('/api/swimmers', router);
  };