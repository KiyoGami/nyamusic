module.exports = {
    name: 'sc',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        if(!args.length) return
        let channelID = args.shift()
        if(channelID.startsWith('<')) channelID = channelID.slice(2, channelID.length - 1)
        client.channels.fetch(channelID).then(channel => {
            const texPerms = channel.permissionsFor(message.client.user)
            if(!texPerms.has('VIEW_CHANNEL') || !texPerms.has('SEND_MESSAGES')) return message.channel.send('Không có quyền gửi tin nhắn trong đó!')
            string = args.join(' ')
            if(string) channel.send(string)
        }).catch(err => message.channel.send('Vui lòng nhập đúng ID hoặc tag channel'))
    }
}   