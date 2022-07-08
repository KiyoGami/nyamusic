const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'baka',
    aliases: ['aho'],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'baka', args, message.content.slice(1).split(/ +/g).shift())
    }
}     