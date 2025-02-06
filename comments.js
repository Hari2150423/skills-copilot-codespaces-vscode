//create the web server
const express = require('express');
const app = express();
//create the server
const server = require('http').Server(app);
//create the web socket
const io = require('socket.io')(server);
//create the database
const mongoose = require('mongoose');
//connect to the database
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

const Comment = mongoose.model('Comment', {
    name: String,
    comment: String
});

app.use(express.static('public'));

app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
});

app.post('/comments', async (req, res) => {
    const comment = new Comment(req.body);
    await comment.save();
    io.emit('comment', req.body);
    res.sendStatus(201);
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});
