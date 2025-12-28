const express = require("express");
const Progress = require("../Models/Progress");
const cloudinary = require("cloudinary").v2;

const updateProgress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { weight, bodyFat, waist, chest, photoUrl, photoPublicId } = req.body;

    let userProgress = await Progress.findOne({ userId });

    const entry = {
      weight,
      bodyFat,
      waist,
      chest,
      date: new Date(),
      photoUrl: photoUrl || undefined,
      photoPublicId: photoPublicId || undefined,
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
    const { id } = req.params; // Entry ID from frontend
    const userId = req.user.userId;

    const record = await Progress.findOne({ userId });
    if (!record) return res.status(404).json({ message: "Record not found" });

    // Find the specific entry to get its publicId
    const entry = record.entries.find((e) => e._id.toString() === id);

    // Delete from Cloudinary if ID exists
    if (entry && entry.photoPublicId) {
      await cloudinary.uploader.destroy(entry.photoPublicId);
    }

    // Remove from MongoDB array
    const updatedRecord = await Progress.findOneAndUpdate(
      { userId },
      { $pull: { entries: { _id: id } } },
      { new: true }
    );
    if (updatedRecord && updatedRecord.entries.length === 0) {
      await Progress.deleteOne({ userId });
    }

    res.status(200).json({ success: true, message: "Entry and Image deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  updateProgress,
  getProgress,
  deleteProgress,
};
