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
    .post(createCharacter);

router.route('/:id')
    .get(getCharacterById)
    .put(updateCharacter)
    .delete(deleteCharacter);

module.exports = router;