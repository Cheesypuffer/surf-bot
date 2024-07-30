const {Schema, model} = require('mongoose')

const dmaps = new Schema({
    map: {
        type: String,
        required:true
    },
    dtier: {
        type: Number,
        required:true
    }
})

module.exports = model('dmaps', dmaps)