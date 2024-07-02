const {Schema, model} = require('mongoose')

const maps = new Schema({
    name: {
        type: String,
        required:true
    },
    tier: {
        type: Number,
        required:true
    },
    icon: {
        type: String,
        required:false,
        default:null
    },
    link: {
        type: String,
        required:true
    }
})

module.exports = model('Maps', maps)