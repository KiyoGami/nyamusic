const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'uwu',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'uwu', args, message.content.slice(1).split(/ +/g).shift())
    }
}     