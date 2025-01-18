const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRouter = require("./routes/authRouter");

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
),
  app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/auth", authRouter);

module.exports = app;
