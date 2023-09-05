const express = require("express");
const router = express.Router();

const Jobs = require("../controllers/jobs");

const auth = require("../middleware/index");

router.get("/", Jobs.getJobs);
router.post("/", auth.authToken, Jobs.createJob);
router.get("/:id", auth.isAuthenticated, Jobs.getJob);
router.put("/:id", auth.authToken, Jobs.updateJob);
router.delete("/:id", auth.authToken, Jobs.deleteJob);

module.exports = router;
