const express = require("express");
const Progress = require("../Models/Progress");

const updateProgress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { weight, bodyFat, waist, chest, photoUrl } = req.body;

    let userProgress = await Progress.findOne({ userId });

    const entry = {
      weight,
      bodyFat,
      waist,
      chest,
      date: new Date(),
      photoUrl: photoUrl || undefined,
    };

    if (!userProgress) {
      userProgress = await Progress.create({
        userId,
        entries: [entry],
      });
    } else {
      userProgress.entries.push(entry);
      await userProgress.save();
    }

    res.status(200).json({ progress: userProgress });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProgress = async (req, res) => {
  try {
    const userId = req.user.userId;

    const userProgress = await Progress.findOne({ userId });

    res.status(200).json({ progress: userProgress });
  } catch (err) {
    res.status(500).json({ message: "failed to fetch progress" });
  }
};
const deleteProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProgress = await Progress.findOneAndUpdate(
      { userId: req.user.userId },
      { $pull: { entries: { _id: id } } },
      { new: true }
    );
    if (!deletedProgress) {
      res.status(400).json({
        success: false,
        message: "no progress not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Progress has been deleted successfully ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error occured ,failed to delete book ",
      error,
    });
  }
};

module.exports = {
  updateProgress,
  getProgress,
  deleteProgress,
};
