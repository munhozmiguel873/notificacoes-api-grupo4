const express = require("express");
const router = express.Router();
const ParticipanteController = require("../controllers/ParticipanteController");

router.get("/", ParticipanteController.index); 
router.get("/:id", ParticipanteController.show); 
router.post("/", ParticipanteController.store); 
router.put("/:id", ParticipanteController.update); 
router.delete("/:id", ParticipanteController.destroy); 

module.exports = router;