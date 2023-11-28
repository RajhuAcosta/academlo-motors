const express = require("express");
const router = express.Router();
const repairsControllers = require("./repairs.controller");

router.get("/repairs",repairsControllers.findAll);
router.post("/repairs",repairsControllers.create);
router.get("/repairs/:id",repairsControllers.findOne);
router.patch("/repairs/:id",repairsControllers.update);
router.delete("/repairs/:id",repairsControllers.delete);

module.exports = router;