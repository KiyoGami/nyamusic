const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'fbi',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'fbi', args, message.content.slice(1).split(/ +/g).shift())
    }
}     