require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/usersRoute");
const requestsRoute = require("./routes/requestsRoute");
const messagesRoute = require("./routes/messagesRoute");
const messageRoomRoute = require("./routes/messageRoomRoute");

connectDB();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({}));

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/requests", requestsRoute);
app.use("/messages", messagesRoute);
app.use("/messageRoom", messageRoomRoute);

mongoose.connection.once("connected", () => {
  console.log("Connected to database");

  app.listen(4000, () => {
    console.log("Server now running on port 4000");
  });
});
