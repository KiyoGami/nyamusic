module.exports = {
    name: 'join',
    aliases: ['j'],
    inVoiceChannel: true,
    run: async (client, message) => {
        let voiceChannel = message.member.voice.channel
        client.distube.voices.join(voiceChannel)
        message.channel.send('Đã vào phòng voice!')
    }
}