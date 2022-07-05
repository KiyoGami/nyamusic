module.exports = {
    name: 'skip',
    aliases: [],
    inVoiceChannel: true,
    run:async (client, message) => {
        const queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send('Không có bài hát nào trong hàng đợi.')
        if(queue.songs.length == 1) return message.channel.send('Không còn bài hát nào kế tiếp')
        client.distube.skip(queue).then((song) => {
            message.channel.send(`Skip thành công\nĐang phát: ${song.name} - \`${song.formattedDuration}\``)
        })
    }
}       