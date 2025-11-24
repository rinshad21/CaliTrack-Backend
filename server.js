const express = require("express");
const app = express();
require("dotenv").config();
const connectToDB = require("./database/db");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const authRoutes = require("./Routes/AuthRouter");
const adminRoutes = require("./Routes/AdminRouter");
const workoutRouters = require("./Routes/workoutRoutes");
const ProgressRouter = require("./Routes/Progress.Router");
const ImageRouter = require("./Routes/ImageRouter");

connectToDB();

app.use(express.json());

app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://calitrac.vercel.app"],
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/api/workouts", workoutRouters);
app.use("/api/progress", ProgressRouter);
app.use("/api/image", ImageRouter);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
