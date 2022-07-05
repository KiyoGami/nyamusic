module.exports = {
    name: 'jump',
    aliases: [],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const string = args.join('')
        client.distube.jump(message, parseInt(string))
            .catch(err => message.channel.send('Vị trí nhảy không hợp lệ'))
    }
}