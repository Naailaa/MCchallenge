const mongoose = require('mongoose')

const superheroSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    gender: {
        type: String,
        required: true

    },
    strength: {
        type: Number,
        required: true

    },
    speed: {
        type: Number,
        required: true

    },
    intelligence: {
        type: Number,
        required: true

    }
})

module.exports = mongoose.model('Superhero', superheroSchema)