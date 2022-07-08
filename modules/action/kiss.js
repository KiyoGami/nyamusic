const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'kiss',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'kiss', args, message.content.slice(1).split(/ +/g).shift())
    }
}     