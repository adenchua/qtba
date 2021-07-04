import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import platformRoute from "./routes/platform";
import moduleRoute from "./routes/module";
import questionRoute from "./routes/question";

const app = express();
const PORT = 5083;
const URI = "mongodb://localhost:27017/designmondays";

app.use(express.json());
app.use(cors());

app.use("/platforms", platformRoute);
app.use("/modules", moduleRoute);
app.use("/questions", questionRoute);

app.all("/ping", (req, res) => {
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
