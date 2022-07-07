module.exports = {
    name: 'stop',
    aliases: ['pause'],
    inVoiceChannel: true,
    run: async (client, message) => {
        client.distube.pause(message)
        embed = {
            color: message.member.displayColor,
            author: {
                icon_url : 'https://cdn.discordapp.com/attachments/993937119355609139/994437899565142086/pause.png',
                name: `Tạm dừng phát nhạc - ${message.member.displayName}`
            }
        }
        message.channel.send({embeds: [embed]})
    }
}