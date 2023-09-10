const express = require("express");
const router = express.Router();

const RealEstate = require("../controllers/realEstate");

const auth = require("../middleware/index");

router.get("/", RealEstate.getAllRealEstate);
router.post("/", auth.authToken, RealEstate.createRealEstate);
router.get("/:id", auth.isAuthenticated, RealEstate.getRealEstate);
router.put("/:id", auth.authToken, RealEstate.updateRealEstate);
router.delete("/:id", auth.authToken, RealEstate.deleteRealEstate);
router.post("/:id/request", RealEstate.makeRequest);

module.exports = router;
