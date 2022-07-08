const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'bite',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'bite', args, message.content.slice(1).split(/ +/g).shift())
    }
}     