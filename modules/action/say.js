module.exports = {
    name: 's',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        string = args.join(' ')
        message.delete()
        if(string.length) message.channel.send(string)
    }
}   