const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'slap',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'slap', args, message.content.slice(1).split(/ +/g).shift())
    }
}     