module.exports = {
    name: 'guilds',
    aliases: ['g', 'servers'],
    inVoiceChannel: false,
    run:async (client, message) => {
        const guilds = client.guilds.cache
        let i = 1
        const q = guilds
                    .map((name) => `${i++}. **${name}**`)
                    .join('\n')
        message.channel.send(`Hiện tại đang có ${guilds.size} máy chủ sử dụng\n ${q}`)
    }
}   