
module.exports = {
    name: 'mode',
    aliases: ['m'],
    inVoiceChannel: true,
    run: async (client, message) => {
        const queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send("-1")
        message.channel.send(`${queue.repeatMode}`)
    }
}