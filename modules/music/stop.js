module.exports = {
    name: 'stop',
    aliases: ['pause'],
    inVoiceChannel: true,
    run: async (client, message) => {
        client.distube.pause(message)
        message.channel.send('Đã tạm dừng bài hát')
    }
}