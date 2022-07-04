module.exports = {
    name: 'stop',
    aliases: ['pause'],
    inVoiceChannel: true,
    run: async (distube, message) => {
        distube.pause(message)
        message.channel.send('Đã tạm dừng bài hát')
    }
}