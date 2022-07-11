const token = process.env.actionToken
const config = require('../config.json')
fetch = require('node-fetch')

module.exports = async (message, action, args, name) => {
    fetch(`https://kawaii.red/api/gif/${action}/token=${token}/`)
        .then(response => {
            response.json()
                .then(result => {
                    string = args.join('')
                    embed = {
                        color: message.member.displayColor,
                        author: {
                            name: message.author.username,
                            icon_url: message.author.avatarURL()
                        },
                        description: string,
                        image: {
                            url: result.response
                        },
                        timestamp: new Date(),
                        footer: {
                            text: name,
                            icon_url: config.botAvatar
                        }
                    }
                    message.channel.send({embeds: [embed] })
                })
                .catch(err => console.error)
        })
        .catch(err => console.error)
}   