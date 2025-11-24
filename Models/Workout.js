const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
  },

  day: {
    day: { type: Number, required: true },
    set: { type: Number, required: true },
    reps: { type: Number, required: true },
    excersie: [{ type: [String], required: true }],
  },
});
module.exports = mongoose.model("Workout", workoutSchema);
