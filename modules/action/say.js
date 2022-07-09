module.exports = {
    name: 's',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        const texPerms = message.channel.permissionsFor(message.client.user)
        string = args.join(' ')
        if(texPerms.has('MANAGE_MESSAGES')) message.delete()
        if(string.length) message.channel.send(string)
    }
}   