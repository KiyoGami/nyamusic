const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'cry',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'cry', args, message.content.slice(1).split(/ +/g).shift())
    }
}     