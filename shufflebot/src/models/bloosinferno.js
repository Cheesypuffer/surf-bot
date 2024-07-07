const {Schema, model} = require('mongoose')

const bloowords = new Schema({
    words: {
        type: Array,
        required:true
    }
})

module.exports = model('Bloowords', bloowords)