const config = require('../../config.json')
module.exports = {
    name: 'resume',
    aliases: ['continue'],
    inVoiceChannel: true,
    run: async (client, message) => {
        queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send('Hàng đợi rỗng, vui lòng thêm bài hát')
        embed = {
            color: message.member.displayColor,
            author: {
                icon_url : config.icon.playing,
                name: `Tiếp tục phát - ${message.member.displayName}`
            }
        }
        queue.resume()
        message.channel.send({embeds: [embed]})
    }
}