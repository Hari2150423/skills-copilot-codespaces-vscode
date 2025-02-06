//create the web server
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const commentsPath = path.join(__dirname, 'comments.json');
const comments = require(commentsPath);

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    const newComment = req.body;
    comments.push(newComment);
    fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
        if (err) {
            res.status(500).send('Could not write to file');
        } else {
            res.status(201).send('Comment added');
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});