const {Schema, model} = require('mongoose')

const gallery = new Schema({
    map: {
        type: String,
        required:true,
        default:'null'
    },
    pics: {
        type: Array,
        required:true,
        default:[]
    }
})

module.exports = model('Gallery', gallery)