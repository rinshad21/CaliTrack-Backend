const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  entries: [
    {
      date: { type: Date },
      weight: { type: Number },
      bodyFat: { type: Number },
      waist: { type: Number },
      chest: { type: Number },
      photoUrl: { type: String },
    },
  ],
});

module.exports = mongoose.model("Progress", progressSchema);
