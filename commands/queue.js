module.exports = {
    name: 'queue',
    aliases: ['q'],
    inVoiceChannel: true,
    run: async (distube, message) => {
        queue = distube.getQueue(message)
        if(!queue) return message.channel.send('Không có bài hát nào trong hàng chờ.')
        const q = queue.songs
            .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
            .join('\n')
        message.channel.send(`**Server Queue**\n${q}`)
    }
}