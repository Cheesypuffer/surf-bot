module.exports = (client) => {
    console.log(`${client.user.tag} is online.`)
    let activities = [`what?`, `surfing probably`, `surf_rainbow 24/7` ],i = 0;   
    setInterval(() => bot.user.setActivity(`${activities[i++ % activities.length]}`, 
    {type: PLAYING})
}