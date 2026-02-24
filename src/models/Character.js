const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Character name is required'],
        unique: true,
        trim: true,
    },
    crew: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        trim: true,
    },
    devilFruit: {
        type: String,
        trim: true,
    },
},
{
    timestamps: true,
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;