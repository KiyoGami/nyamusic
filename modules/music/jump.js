const config = require('../../config.json')
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
                        icon_url : config.icon.jump,
                        name: `Đã nhảy tới vị trí ${string} - ${message.member.displayName}`
                    }
                }
                message.channel.send({embeds: [embed]})
            })
            .catch(err => message.channel.send('Vị trí nhảy không hợp lệ'))
    }
}