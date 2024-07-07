const {Schema, model} = require('mongoose')

const bloowords = new Schema({
    words: {
        type: Array,
        required:true,
        default:[]
    }
})

module.exports = model('Bloowords', bloowords)