const config = require('../../config.json')
module.exports = {
    name: 'stop',
    aliases: ['pause'],
    inVoiceChannel: true,
    run: async (client, message) => {
        const queue = client.distube.getQueue(message)
        if(!queue || !queue.playing) return message.channel.send('Không có bài hát nào đang phát!')
        queue.pause()
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