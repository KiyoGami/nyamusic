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
        }).then(() => {
            const queue = client.distube.getQueue(message)
            const song = queue.songs[queue.songs.length - 1]
            message.channel.send(`Đã thêm vào hàng chờ: ${song.name} - \`${song.formattedDuration}\``)
        })
    }
}