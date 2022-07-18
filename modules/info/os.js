const os = require('os')
module.exports = {
    name: 'os',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message) => {
        message.channel.send(`Tổng RAM: \`${(os.totalmem()/1024/1024).toFixed(2)}\`GB\nRAM còn trống: \`${(os.freemem()/1024/1024).toFixed(2)}\`GB`)
    }
}       