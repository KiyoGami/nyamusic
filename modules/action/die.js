const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'die',
    aliases: ['death', 'dead'],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'die', args, message.content.slice(1).split(/ +/g).shift())
    }
}     