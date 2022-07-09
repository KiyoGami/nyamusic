const token = process.env.actionToken
const config = require('../config.json')
const { Kawaii } = require('kawaii-api');
const api = new Kawaii(token);

module.exports = async (message, action, args, name) => {
    string = args.join('')
    api.get("gif", action).then((result) => {
        embed = {
            color: message.member.displayColor,
            author: {
                name: message.author.username,
                icon_url: message.author.avatarURL()
            },
            description: string,
            image: {
                url: result
            },
            timestamp: new Date(),
            footer: {
                text: name,
                icon_url: config.botAvatar
            }
        }
        if(string) message.channel.send({content: string, embeds: [embed]})
        else message.channel.send({embeds: [embed]})
    })
}   