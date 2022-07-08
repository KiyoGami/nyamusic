const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'smoke',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'smoke', args, message.content.slice(1).split(/ +/g).shift())
    }
}     