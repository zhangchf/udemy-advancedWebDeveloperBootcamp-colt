const db = require('../models');

exports.getTodos = function(req, res) {
    db.Todo.find()
        .then(function(todos) {
            res.send(todos);
        })
        .catch(function(err) {
            res.send(err);
        });
};

exports.createTodo = function(req, res) {
    console.log(req.body);
    db.Todo.create(req.body)
        .then(function(todo) {
            res.status(201).send(todo);
        })
        .catch(function(err) {
            res.send(err);
        })
};

exports.getTodo = function(req, res) {
    console.log(req.params.todoId);
    db.Todo.findById(req.params.todoId)
        .then(function(foundTodo) {
            res.send(foundTodo);
        })
        .catch(function(err) {
            res.send(err);
        })
};

exports.updateTodo = function(req, res) {
    db.Todo.findByIdAndUpdate(req.params.todoId, req.body, {new: true})
        .then(function(foundTodo) {
            res.json(foundTodo);
        })
        .catch(function(err) {
            res.send(err);
        })
};

exports.deleteTodo = function(req, res) {
    db.Todo.remove({_id: req.params.todoId})
        .then(function(todo) {
            res.send("Deleted" + todo);
        })
        .catch(function(err) {
            res.send(err);
        })
};