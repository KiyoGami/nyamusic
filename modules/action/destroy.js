const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'destroy',
    aliases: ['crush'],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'destroy', args, message.content.slice(1).split(/ +/g).shift())
    }
}     