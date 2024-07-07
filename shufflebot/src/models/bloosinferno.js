const {Schema, model} = require('mongoose')

const maps = new Schema({
    words: {
        type: Array,
        required:true
    }
})

module.exports = model('Maps', maps)