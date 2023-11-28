const express = require("express");
const router = express.Router();
const usersControllers = require("./users.controller");

router.get("/users",usersControllers.findAll);
router.post("/users",usersControllers.create);
router.get("/users/:id",usersControllers.findOne);
router.patch("/users/:id",usersControllers.update);
router.delete("/users/:id",usersControllers.delete);

module.exports = router;