const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//  Create Schema
const TodoSchema = new Schema({
  markasdone: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    required: true
  },
  createdon: {
    type: Date,
    default: Date.now
  }
});

module.exports = Todo = mongoose.model("todo", TodoSchema);
