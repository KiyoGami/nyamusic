const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'alarm',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'alarm', args, message.content.slice(1).split(/ +/g).shift())
    }
}     