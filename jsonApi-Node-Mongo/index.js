const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const todosRouter = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Serve static files within the specific directory.
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
    res.sendFile("index.html");
})

app.use('/api/todos/', todosRouter);

app.listen(PORT, function() {
    console.log('Start listening on port: ', PORT);
})