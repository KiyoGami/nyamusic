const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'pat',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'pat', args, message.content.slice(1).split(/ +/g).shift())
    }
}       