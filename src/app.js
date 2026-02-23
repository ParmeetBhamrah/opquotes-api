const express = require('express');
const app = express()

app.use(express.json()); // inbuilt middleware for PUT/POST

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the One Piece Quotes API!'
    })
});

module.exports = app;