const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const todos = require("./routes/api/todos");

const app = express();

//  Body parser midlleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Databse config
const db = require("./config/keys").mongoURI;

// Connect to mongo database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to the Mongo DB"))
  .catch(err => console.log(`Connection to the Mongo DB Failed ${err}`));

//  User routes
app.use("/api/todos", todos);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
