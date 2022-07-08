const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'peek',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'peek', args, message.content.slice(1).split(/ +/g).shift())
    }
}     