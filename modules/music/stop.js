const config = require('../../config.json')
module.exports = {
    name: 'stop',
    aliases: ['pause'],
    inVoiceChannel: true,
    run: async (client, message) => {
        client.distube.pause(message)
        embed = {
            color: message.member.displayColor,
            author: {
                icon_url : config.icon.pause,
                name: `Tạm dừng phát nhạc - ${message.member.displayName}`
            }
        }
        message.channel.send({embeds: [embed]})
    }
}