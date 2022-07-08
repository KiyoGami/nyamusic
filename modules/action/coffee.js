const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'coffee',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'coffee', args, message.content.slice(1).split(/ +/g).shift())
    }
}     