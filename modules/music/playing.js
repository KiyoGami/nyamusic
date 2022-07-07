module.exports = {
    name: 'playing',
    aliases: ['np'],
    inVoiceChannel: false,
    run: async (client, message) => {
        const queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send('Không có bài hát nào đang phát.')
        const song = queue.songs[0]
        embed = {
            color: song.member.displayColor,
            title: (song.name.length < 30) ? song.name :(song.name.slice(0, 30) +'...'),
            url: song.url,   
            description: `Người yêu cầu: **${song.user.tag}**\nThời lượng: \`${song.formattedDuration}\`\nTiêu đề đầy đủ: **${song.name}**`,
            thumbnail: {
                url: song.thumbnail,
            },
            timestamp: new Date(),
            footer:{
                text: 'Đang phát',
                icon_url: 'https://cdn.discordapp.com/attachments/993937119355609139/994119008884359198/play-button.png'
            }               
        }
        message.channel.send({embeds: [embed]})
    }
}