const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'smug',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'smug', args, message.content.slice(1).split(/ +/g).shift())
    }
}     