const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'happy',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'happy', args, message.content.slice(1).split(/ +/g).shift())
    }
}     