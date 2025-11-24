const User = require("../Models/user");
const updateLevel = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { level } = req.body;
    const allowed = ["beginner", "intermediate", "advanced"];
    if (!allowed.includes(level)) {
      return res.status(400).json({ error: "invalid level" });
    }
    const updatedLevel = await User.findByIdAndUpdate(
      userId,
      { level },
      { new: true }
    );
    res.status(200).json({ success: true, level: updatedLevel.level });
  } catch (error) {
    res.status(500).json({ success: false });
    console.log(error.message);
  }
};
module.exports = {
  updateLevel,
};
