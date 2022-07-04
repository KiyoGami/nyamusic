module.exports = {
    name: 'join',
    aliases: ['j'],
    inVoiceChannel: true,
    run: async (distube, message) => {
        let voiceChannel = message.member.voice.channel
        distube.voices.join(voiceChannel)
        message.channel.send('Đã vào phòng voice!')
    }
}