module.exports = {
    name: 'nowusing',
    aliases: ['nu', 'using'],
    inVoiceChannel: false,
    run:async (client, message) => {
        message.channel.send(`Đang có ${client.distube.queues.collection.size} server đang sử dụng phát nhạc.`)
    }
}     