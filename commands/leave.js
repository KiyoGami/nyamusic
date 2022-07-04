module.exports = {
    name: 'leave',
    aliases: ['out', 'off'],
    inVoiceChannel: true,
    run: async (distube, message) => {
        distube.voices.leave(message.member.voice.channel)
        message.channel.send('Đã rời khỏi phòng voice.')
    }
}