const config = require('../../config.json')
module.exports = {
    name: 'skip',
    aliases: ['next'],
    inVoiceChannel: true,
    run:async (client, message) => {
        const queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send('Không có bài hát nào trong hàng đợi.')
        if(queue.songs.length == 1) return message.channel.send('Không còn bài hát nào kế tiếp')
        client.distube.skip(queue)
        let embed = {
            color: message.member.displayColor,
            author: {
                icon_url : config.icon.skip,
                name: `Skip thành công - ${message.member.displayName}`
            }
        }
        message.channel.send({embeds: [embed]})
    }
}       