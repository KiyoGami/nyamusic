const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'blush',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'blush', args, message.content.slice(1).split(/ +/g).shift())
    }
}     