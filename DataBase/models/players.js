const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../../config.json')

//Creating schema
const playersSchema = new Schema({
    highID: {
        type: Number,
        required: true
    },
    lowID: {
        type: Number,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: 'You'
    },
    email: {
        type: String,
        default: ''
    },
    passwordHash: {
        type: String,
        default: ''
    }
})

mongoose.model('players', playersSchema)