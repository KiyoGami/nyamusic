const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'clap',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'clap', args, message.content.slice(1).split(/ +/g).shift())
    }
}     