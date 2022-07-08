const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'dance',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'dance', args, message.content.slice(1).split(/ +/g).shift())
    }
}     