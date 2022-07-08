const config = require('../config.json')
module.exports = async (message, embeds) => {
    let currentPage = 0 
    const msg = await message.channel.send({embeds: [embeds[currentPage]]})

    await msg.react(config.emmoji.first)
    await msg.react(config.emmoji.previous)
    await msg.react(config.emmoji.next)
    await msg.react(config.emmoji.last)

    const filter = (reaction, user) => [config.emmoji.first, config.emmoji.previous, config.emmoji.next, config.emmoji.last].includes(reaction.emoji.name)

    const collector = msg.createReactionCollector({
        filter,
        time: 60000,
        dispose: true
    })

    function pageMove(reaction){
        switch(reaction.emoji.name){
            case config.emmoji.first:
                if(currentPage != 0) msg.edit({embeds: [embeds[currentPage = 0]]})
                break;
            case config.emmoji.previous:
                if(currentPage != 0) msg.edit({embeds: [embeds[--currentPage]]})
                break;
            case config.emmoji.next:
                if(currentPage != embeds.length - 1) msg.edit({embeds: [embeds[++currentPage]]})
                break;
            case config.emmoji.last:
                if(currentPage != embeds.length - 1) msg.edit({embeds: [embeds[currentPage = embeds.length - 1]]})
                break;
            default:
                break;
        }
        collector.resetTimer()
    }

    collector
        .on('collect', reaction => pageMove(reaction))
        .on('remove', reaction => pageMove(reaction))
        .on('end', () => msg.edit({content: 'Đã hết thời gian'}))
}