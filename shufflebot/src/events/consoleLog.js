const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction, Message, ThreadOnlyChannel, Events} = require("discord.js");
const mapz = require('../models/maps')
const blootorture = require('../models/bloosinferno')
const mongoose = require('mongoose');

async function execute() {
    var mapss = await mapz.find(({}))
    for(const map of mapss) {
        ///console.log(map.name)
    }
}

execute()
