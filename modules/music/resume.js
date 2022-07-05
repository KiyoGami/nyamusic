module.exports = {
    name: 'resume',
    aliases: ['continue'],
    inVoiceChannel: true,
    run: async (client, message) => {
        queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send('Hàng đợi rỗng, vui lòng thêm bài hát')
        queue.resume()
        message.channel.send('Tiếp tục bài hát')
    }
}