const Character = require('../models/character');

// GET /api/characters
const getAllCharacters = async (req, res, next) => {
    try {
        const characters = await Character.find();
        res.status(200).json({
            success: true,
            count: characters.length,
            data: characters,
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/characters/:id
const getCharacterById = async (req, res, next) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) {
            res.status(404).json({
                success: false,
                message: 'Character not found'
            });
        }
        res.status(200).json({
            success: true,
            data: character,
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/characters
const createCharacter = async (req, res, next) => {
    try {
        const character = await Character.create(req.body);
        res.status(201).json({
            success: true,
            data: character,
        });
    } catch (error) {
        next(error);
    }
};

// PUT /api/character/:id
const updateCharacter = async (req, res, next) => {
    try {
        const character = await Character.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // otherwise, it returns the pre-updated version of the document by default
                runValidators: true, // otherwise, mongoose skips validation on updation by default
            }
        )
        if (!character) {
            res.status(404).json({
                success: false,
                message: 'Character not found',
            });
        }
        res.status(200).json({
            success: true,
            data: character,
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/characters/:id
const deleteCharacter = async (req, res, next) => {
    try {
        const character = await Character.findByIdAndDelete(req.params.id);
        if (!character) {
            res.status(404).json({
                success: false,
                message: 'Character not found',
            })
        }
        res.status(200).json({
            success: true,
            message: 'Character deleted',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
}