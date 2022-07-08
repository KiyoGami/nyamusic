const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'pout',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'pout', args, message.content.slice(1).split(/ +/g).shift())
    }
}     