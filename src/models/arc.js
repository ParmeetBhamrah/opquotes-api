const mongoose = require('mongoose');

const arcSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Arc name is required"],
        trim: true,
        unique: true,
    },
    saga: {
        type: String,
        trim: true,
    },
    order: {
        type: Number,
    }
},
{
    timestamps: true
});

const Arc = mongoose.model('Arc', arcSchema);

module.exports = Arc;