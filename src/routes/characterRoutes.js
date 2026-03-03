const protect = require('../middleware/auth');
const express = require('express');
const router = express.Router(); // creates a mini express app
const {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
} = require('../controllers/characterController');

router.route('/')
    .get(getAllCharacters)
    .post(protect, createCharacter);

router.route('/:id')
    .get(getCharacterById)
    .put(protect, updateCharacter)
    .delete(protect, deleteCharacter);

module.exports = router;