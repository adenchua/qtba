import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import platformRoute from "./routes/platform";
import moduleRoute from "./routes/module";
import questionRoute from "./routes/question";

const app = express();
const PORT = 5083;
const URI = "mongodb://mongodb:27017/designmondays";
const API_PREPEND = "/api";

app.use(express.json());
app.use(cors());

app.use(`${API_PREPEND}/platforms`, platformRoute);
app.use(`${API_PREPEND}/modules`, moduleRoute);
app.use(`${API_PREPEND}/questions`, questionRoute);

app.all(`${API_PREPEND}/ping`, (req, res) => {
  res.status(200).send({ message: "pong" });
});

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.on("open", function () {
  console.log("Connection to database successful");
  //only start server if connection to backend is successful
  app.listen(PORT, () => console.log(`Listening on Port ${PORT}...`));
});
