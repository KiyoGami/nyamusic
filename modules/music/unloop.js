module.exports = {
    name: 'unloop',
    aliases: ['unl', 'unre'],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send('Không có bài hát nào trong hàng chờ!')
        if (queue.repeatMode) {
            queue.setRepeatMode(0)
            message.channel.send('Đã tắt chế độ lặp!')
        }
        else message.channel.send('Không có bài hát nào đang lặp!')
    }
}