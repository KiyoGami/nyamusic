module.exports = {
    name: 'queue',
    aliases: ['q'],
    inVoiceChannel: false,
    run: async (client, message) => {
        queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send('Không có bài hát nào trong hàng chờ.')
        const q = queue.songs
            .map((song, i) => `${i === 0 ? 'Đang phát:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
            .join('\n')
        message.channel.send(`**Hàng chờ của server**\n${q}`)
    }
}