module.exports = {
    name: 'ping',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message) => {
        const timeDelay = Date.now() - message.createdTimestamp
        message.channel.send(`Tin nhắn này trả lời với độ trễ là ${timeDelay}ms.`)
    }
}       