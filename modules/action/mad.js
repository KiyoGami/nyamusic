const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'mad',
    aliases: ['angry'],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'mad', args, message.content.slice(1).split(/ +/g).shift())
    }
}     