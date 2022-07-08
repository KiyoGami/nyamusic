const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'hug',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'hug', args, message.content.slice(1).split(/ +/g).shift())
    }
}     