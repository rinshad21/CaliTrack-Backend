const express = require("express");
const {
  updateProgress,
  getProgress,
  deleteProgress,
} = require("../controllers/ProgressController");
const { updateLevel, getProfile } = require("../controllers/UserLevelController");
const ensureAuthenticated = require("../middlewares/Auth");

const router = express.Router();

router.post("/update", ensureAuthenticated, updateProgress);
router.get("/", ensureAuthenticated, getProgress);
router.delete("/delete/:id", ensureAuthenticated, deleteProgress);
router.post("/update-level", ensureAuthenticated, updateLevel);
router.get("/profile", ensureAuthenticated, getProfile);

module.exports = router;
