module.exports = {
    name: 'resume',
    aliases: ['continue'],
    inVoiceChannel: true,
    run: async (client, message) => {
        queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send('Hàng đợi rỗng, vui lòng thêm bài hát')
        embed = {
            color: message.member.displayColor,
            author: {
                icon_url : 'https://cdn.discordapp.com/attachments/993937119355609139/994119008884359198/play-button.png',
                name: `Tiếp tục phát - ${message.member.displayName}`
            }
        }
        queue.resume()
        message.channel.send({embeds: [embed]})
    }
}