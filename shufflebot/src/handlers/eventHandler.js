const path = require('path')

const getAllFiles = require("../utils/getAllFiles")

module.exports = (client) => {
    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true)
    console.log(eventFolders)
    for (const eventFolder of eventFolders) {
        console.log(eventFolder)
        const eventFiles = getAllFiles(eventFolder);
        eventFiles.sort((a, b) => {a>b})
        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();
        client.on(eventName,async (arg) => {
            for (const eventFile of eventFiles) {
                console.log(eventFile)
                const eventFunction = require(eventFile)
                await eventFunction(client, arg)
            }
        }) 
    }
}