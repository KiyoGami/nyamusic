module.exports = {
    name: 'play',
    aliases: ['p'],
    inVoiceChannel: true,
    run: async (client, message, args, texPerms, voicePerms) => {
        if(!voicePerms.has('CONNECT') || !voicePerms.has('SPEAK')) return message.channel.send('Cần có quyền để phát nhạc (kết nối và nói)!')
        const string = args.join(' ')   
        if (!string) return message.channel.send('Cần có tên bài hát hoặc URL') 
        client.distube.play(message.member.voice.channel, string, {
            member: message.member,
            textChannel: message.channel,
        })
    }
}