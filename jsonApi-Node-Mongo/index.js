const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const todosRouter = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.send('Hello from Home');
})

app.use('/api/todos/', todosRouter);

app.listen(PORT, function() {
    console.log('Start listening on port: ', PORT);
})