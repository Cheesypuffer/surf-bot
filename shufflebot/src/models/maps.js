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
    link: {
        type: String,
        required:true
    },
    upvotes: {
        type: Number,
        required:true,
        default:0
    },
    downvotes: {
        type: Number,
        required:true,
        default:0
    },
    icon: {
        type: String,
        required:false,
        default:'https://media.discordapp.net/attachments/1256006687366713427/1257000435462570077/Untitled.jpg?ex=66857361&is=668421e1&hm=70e2ea805f782e68e5cf2eaa2220e0fd26d6c78a46b5e70095a6bf64d1ae26e3&=&format=webp'
    },
    thumbnail: {
        type:String,
        required:false,
        default:'https://media.discordapp.net/attachments/1256006687366713427/1257771232955207820/missingno.png?ex=66859e3e&is=66844cbe&hm=53e5fc4c5178852dffa13a29e55f1617bb0166ebcdbb474accc6a61d6e6694a8&=&format=webp&quality=lossless'
    }
})

module.exports = model('Maps', maps)