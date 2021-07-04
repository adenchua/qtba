import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// import developerRoute from "./routes/developer";
// import projectRoute from "./routes/project";
// import ticketRoute from "./routes/ticket";
// import sprintRoute from "./routes/sprint";

const app = express();
const PORT = 5083;
const URI = "mongodb://localhost:27017/designmondays";

app.use(express.json());
app.use(cors());

// app.use("/developers", developerRoute);
// app.use("/projects", projectRoute);
// app.use("/tickets", ticketRoute);
// app.use("/sprints", sprintRoute);

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
