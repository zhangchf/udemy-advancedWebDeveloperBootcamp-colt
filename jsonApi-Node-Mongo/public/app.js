
$(document).ready(function() {
    $.getJSON("/api/todos")
        .then(addTodos)
        .catch(err => {
            console.log(err);
        });

    $("#newTodo").keypress(function(event) {
        if (event.which == 13) {
            createTodo($("#newTodo").val());
        }
    })

    $("#todoList").on('click', 'li', function() {
        updateTodo($(this));
    })

    $("#todoList").on('click', 'span', function(event) {
        event.stopPropagation();
        let todoLi = $(this).parent();
        deleteTodo(todoLi);
    })
})

function addTodos(todos) {
    console.log(todos);
    todos.forEach(todo => {
        addTodo(todo);
    })
}

function addTodo(todo) {
    let newTodo = $('<li>' + todo.name + '<span>X</span></li>');
    newTodo.data("id", todo._id);
    newTodo.data("completed", todo.completed);
    newTodo.addClass('task');
    if (todo.completed) {
        newTodo.addClass('done');
    }
    $('#todoList').append(newTodo);
}

function createTodo(todoName) {
    $.post("/api/todos", {name: todoName})
        .then(todo => {
            addTodo(todo);
        })
        .catch(err => {
            console.log(err);
        })
}

function deleteTodo(todoLi) {
    $.ajax({
        method: "DELETE",
        url: "/api/todos/" + todoLi.data("id") 
    })
    .then(function() {
        todoLi.remove();
    })
    .catch(err => {
        console.log(err);
    })
}

function updateTodo(todoLi) {
    let isDone = !todoLi.data("completed");
    $.ajax({
        method: "PUT",
        url: "/api/todos/" + todoLi.data("id"),
        data: {
            completed: isDone
        }
    })
    .then((newTodo) => {
        console.log(newTodo);
        todoLi.toggleClass("done");
        todoLi.data("completed", isDone);
    })
}