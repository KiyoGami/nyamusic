const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'lick',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'lick', args, message.content.slice(1).split(/ +/g).shift())
    }
}     