module.exports = {
    name: 'volume',
    aliases: ['vol'],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        client.distube.pause(message)
        message.channel.send('Đã tạm dừng bài hát')
        const percent = Number(args[0])
        client.distube.setVolume(message, percent)
        message.channel.send(`Đã chỉnh volume thành ${percent}%.`)
    }
}