const express = require("express");
const router = express.Router();

//  Todo model
const Todo = require("../../models/Todo");

//  Validation
const validateTodoInput = require("../../validation/todo");

//  @route GET api/todos
//  @desc Get todos list
//  @access public
router.get("/", (req, res) => {
  Todo.find()
    .sort({ createdon: 1 })
    .then(todos => res.json(todos))
    .catch(err =>
      res.status(404).json({ notodosfound: "Couldn't fetch todos" })
    );
});

//  @route POST api/todos
//  @desc Add a todo
//  @access public
router.post("/", (req, res) => {
  const { errors, isValid } = validateTodoInput(req.body);

  //  Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newTodo = new Todo({
    text: req.body.text,
    markasdone: req.body.markasdone
  });

  newTodo.save().then(todo => res.json(todo));
});

//  @route POST api/todos/:id
//  @desc Update a todo
//  @access public
router.post("/:id", (req, res) => {
  const todoFields = {};
  const { errors, isValid } = validateTodoInput(req.body);

  //  Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  todoFields.markasdone = req.body.markasdone;
  todoFields.text = req.body.text;

  Todo.findByIdAndUpdate(req.params.id, { $set: todoFields })
    .then(todo => res.json({ todoupdated: "Todo Successfully Updated" }))
    .catch(err =>
      res.status(404).json({ todonotfound: "No Todo Found with the ID" })
    );
});

//  @route DELETE api/todos/:id
//  @desc Delete a todo
//  @access public
router.delete("/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      //  Delete
      todo
        .remove()
        .then(() => res.json({ tododeleted: "Todo Successfully Deleted" }));
    })
    .catch(err =>
      res.status(404).json({ todonotfound: "No Todo Found with the ID" })
    );
});

module.exports = router;
