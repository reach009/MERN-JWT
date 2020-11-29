const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// environment config
require("dotenv").config();

const app = express();

// Since express release 4.16.0, bodyParson.json() is included in the bundle
// Use express.json() instead
app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

app.use("/users", require("./routes/users"));

app.use("/todos", require("./routes/todo"));
