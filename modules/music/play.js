module.exports = {
    name: 'play',
    aliases: ['p'],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const string = args.join(' ')   
        if (!string) return message.channel.send('Cần có tên bài hát hoặc URL') 
        client.distube.play(message.member.voice.channel, string, {
            member: message.member,
            textChannel: message.channel,
        })
    }
}

const embed = {
    decription: 'Xoá đi cho gọn ehe~~'
}