const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'laugh',
    aliases: ['smile', 'haha'],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'laugh', args, message.content.slice(1).split(/ +/g).shift())
    }
}     