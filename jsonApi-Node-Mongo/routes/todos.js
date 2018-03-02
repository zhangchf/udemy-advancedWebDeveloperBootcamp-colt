const express = require('express');
const router = express.Router();
const db = require('../models');
const todoHelpers = require('../helpers/todos');

router.route('/')
    .get(todoHelpers.getTodos)
    .post(todoHelpers.createTodo)

router.route('/:todoId')
    .get(todoHelpers.getTodo)
    .put(todoHelpers.updateTodo)
    .delete(todoHelpers.deleteTodo)

module.exports = router;