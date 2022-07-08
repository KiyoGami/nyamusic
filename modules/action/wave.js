const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'wave',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'wave', args, message.content.slice(1).split(/ +/g).shift())
    }
}     