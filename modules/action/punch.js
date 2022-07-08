const action = require('../../utils/KawaiiApi.js')
module.exports = {
    name: 'punch',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        action(message, 'punch', args, message.content.slice(1).split(/ +/g).shift())
    }
}     