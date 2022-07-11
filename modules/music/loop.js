const config = require('../../config.json')
module.exports = {
    name: 'loop',
    aliases: ['repeat', 're'],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send('Không có bài hát nào trong hàng chờ!')
        embedLoop = (text) => embed = {
            color: message.member.displayColor,
            author: {
                icon_url: config.icon.loop,
                name: `${text}`
            }
        }
        if (!args.length) {
            if (queue.repeatMode) return message.channel.send(`Đang ở trong chế độ lặp ${queue.repeatMode == 1 ? 'bài hát' : 'hàng chờ'}`)
            else {
                queue.setRepeatMode(1)
                return message.channel.send({embeds: [embedLoop('Đã lặp bài hát hiện tại.')]})
            }
        } else {
            mode = args.shift().toLowerCase()
            if (['1', 's', 'song', 'track'].includes(mode)) {
                queue.setRepeatMode(1)
                return message.channel.send({embeds: [embedLoop('Đã lặp bài hát hiện tại.')]})
            } else if (['2', 'q', 'queue', 'list', 'playlist', 'songs'].includes(mode)) {
                queue.setRepeatMode(2)
                return message.channel.send({embeds: [embedLoop('Đã lặp toàn bộ hàng chờ hiện tại.')]})
            }
            message.channel.send('Tuỳ chọn không hợp lệ')
        }
    }
}
