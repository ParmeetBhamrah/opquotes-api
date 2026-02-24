const express = require('express');
const app = express()
const errorHandler = require('./middleware/errorHandler');
const characterRoutes = require('./routes/characterRoutes');

app.use(express.json()); // inbuilt middleware for PUT/POST

app.use('/api/characters', characterRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the One Piece Quotes API!'
    })
});

app.use(errorHandler);

module.exports = app;