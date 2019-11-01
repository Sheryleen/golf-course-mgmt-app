/* GET home page. */
const express = require("express");
const router = express.Router();
const tee_timesController = require("../controllers/tee_times");

/* GET home page. */
router.get("/", tee_timesController.getAllTee_Times);
router.get("/:id", tee_timesController.getOneTee_Time);
router.post("/", tee_timesController.addOneTee_Time);
router.patch("/:id", tee_timesController.updateOneTee_Time);
router.delete("/:id", tee_timesController.removeOneTee_Time);

module.exports = router;
