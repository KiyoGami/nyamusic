const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'cute',
    aliases: ['kawaii'],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'cute', args, message.content.slice(1).split(/ +/g).shift())
    }
}     