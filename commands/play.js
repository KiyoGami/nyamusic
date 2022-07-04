module.exports = {
    name: 'play',
    aliases: ['p'],
    inVoiceChannel: true,
    run: async (distube, message, args) => {
        const string = args.join(' ')   
        if (!string) return message.channel.send('Cần có tên bài hát hoặc URL') 
        distube.play(message.member.voice.channel, string, {
            member: message.member,
            textChannel: message.channel,
        })
    }
}