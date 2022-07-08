const config = require('../../config.json')
const embedSong = require('../../utils/songEmbed.js')
module.exports = {
    name: 'playing',
    aliases: ['np'],
    inVoiceChannel: false,
    run: async (client, message) => {
        const queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send('Không có bài hát nào đang phát.')
        const song = queue.songs[0]
        message.channel.send({embeds: [embedSong(song, config.icon.playing, 'Đang phát', 0)]})
    }
}