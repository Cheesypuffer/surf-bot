const {Schema, model} = require('mongoose')

const gallery = new Schema({
    map: {
        type: String,
        required:true,
        default:'null'
    },
    pics: {
        type: Array,
        required:false,
        default:[]
    }
})

module.exports = model('Gallery', gallery)