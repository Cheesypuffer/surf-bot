const {Schema, model} = require('mongoose')

const record = new Schema({
    userId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
        default: 0,
    },
    map: {
        type: String,
        required: true,
        default: 0,
    },
    proof: {
        type: String,
        required: true,
        default: 0,
    }
})

module.exports = model('Record', record)