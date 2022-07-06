module.exports = {
    name: 'jump',
    aliases: [],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const string = args.join('')
        client.distube.jump(message, parseInt(string))
            .then(() => {
                let embed = {
                    color: message.member.displayColor,
                    author: {
                        icon_url : 'https://cdn.discordapp.com/attachments/993937119355609139/994158396578213988/up-arrow.png',
                        name: `Đã nhảy tới vị trí ${string} - ${message.member.displayName}`
                    }
                }
                message.channel.send({embeds: [embed]})
            })
            .catch(err => message.channel.send('Vị trí nhảy không hợp lệ'))
    }
}