module.exports = {
    name: 'volume',
    aliases: ['vol'],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send('Không có hàng chờ để set âm lượng')
        let percent = new Number()
        if(!args.length) percent = 70
        else percent = Number(args[0])
        if (isNaN(percent)) return message.channel.send(`Âm lượng không hợp lệ`)
        client.distube.setVolume(message, percent)
        message.channel.send(`Đã chỉnh volume thành ${percent}%.`)
    }
}