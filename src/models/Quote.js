const mongoose = require('mongoose');
const Character = require('./character');

const quoteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Quote text is required'],
        trim: true,
    },
    character: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character',
        required: [true, 'Character is required']
    },
    arc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Arc',
    }
},
{
    timestamps: true,
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;