module.exports = {
    name: 'join',
    aliases: ['j'],
    inVoiceChannel: true,
    run: async (client, message, args, texPerms, voicePerms) => {
        if(!voicePerms.has('CONNECT') || !voicePerms.has('SPEAK')) return message.channel.send('Cần có quyền để phát nhạc (kết nối và nói)!')
        let voiceChannel = message.member.voice.channel
        client.distube.voices.join(voiceChannel)
        message.channel.send('Đã vào phòng voice!')
    }
}