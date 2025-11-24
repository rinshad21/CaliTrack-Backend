const express = require("express");

const Workout = require("../Models/Workout");
const User = require("../Models/user");

const PostWorkout = async (req, res) => {
  // Checq  if body is an array to determine if it's a single or bulk insert
  if (Array.isArray(req.body)) {
    try {
      const newWorkouts = await Workout.insertMany(req.body, {
        ordered: false,
      });

      res.status(201).json({
        message: `${newWorkouts.length} workouts added successfully.`,
        data: newWorkouts,
      });
    } catch (error) {
      console.error("Bulk insert error:", error.message);
      res.status(500).json({
        message: "Failed to add one or more workouts in the batch.",
        error: error.message,
      });
    }
  } else {
    try {
      const newWorkout = new Workout(req.body);
      await newWorkout.save();
      res.status(201).json({ message: "workout added", data: newWorkout });
    } catch (error) {
      console.error("Single workout save error:", error.message);
      res.status(500).json({
        message: "Failed to add single workout.",
        error: error.message,
      });
    }
  }
};
const getAllWorkouts = async (req, res) => {
  try {
    const role = req.user.role;
    const level = req.user.level;

    let query = {};

    if (role !== "admin") {
      query.level = level;
    }

    const workouts = await Workout.find(query).sort({ createdAt: -1 });

    res.status(200).json({ workouts });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "failed to fetch workouts" });
  }
};
const UpdateWorkouts = async (req, res) => {
  try {
    const { id } = req.params;
    const updateWorkout = await Workout.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updateWorkout) {
      return res.status(404).json({
        success: false,
        message: "couldn't find the workout",
      });
    }
    res.status(200).json({
      success: true,
      message: "workout Updated successfully",
      updateWorkout,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "error occured ,failed to update workout",
      error: error.message,
    });
  }
};
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedworkout = await Workout.findByIdAndDelete(id);
    if (!deletedworkout) {
      res.status(404).json({
        success: false,
        message: "workout not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "workout Updated successfully",
      deleteWorkout,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error occured ,failed to delete book",
      error,
    });
  }
};
module.exports = {
  PostWorkout,
  UpdateWorkouts,
  getAllWorkouts,
  deleteWorkout,
};
