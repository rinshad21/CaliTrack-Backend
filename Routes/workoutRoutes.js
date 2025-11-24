const express = require("express");

const {
  PostWorkout,
  UpdateWorkouts,
  getAllWorkouts,
  deleteWorkout,
} = require("../controllers/WorkoutController");
const verifyAdminToken = require("../middlewares/AdminValidation");
const ensureAuthenticated = require("../middlewares/Auth");
const router = express.Router();

router.post("/add-workout", verifyAdminToken, PostWorkout);
router.get("/", ensureAuthenticated, getAllWorkouts);
router.put("/edit/:id", verifyAdminToken, UpdateWorkouts);
router.delete("/delete/:id", verifyAdminToken, deleteWorkout);
module.exports = router;
