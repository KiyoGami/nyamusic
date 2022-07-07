module.exports = {
    name: 'guilds',
    aliases: ['g', 'servers'],
    inVoiceChannel: false,
    run:async (client, message) => {
        const cache = client.guilds.cache
        const guilds = cache.map(data => data)
        const q = embedGuilds(guilds)
        let currentPage = 0
        const msg = await message.channel.send({embeds: [q[currentPage]]})

        await msg.react('⏪')
        await msg.react('⬅️')
        await msg.react('➡️')
        await msg.react('⏩')

        const collector = msg.createReactionCollector({
            time: 20000,
            dispose: true
        })

        function pageMove(reaction){
            switch(reaction.emoji.name){
                case '⏪':
                    if(currentPage != 0) msg.edit({embeds: [q[currentPage = 0]]})
                    break;
                case '⬅️':
                    if(currentPage != 0) msg.edit({embeds: [q[--currentPage]]})
                    break;
                case '➡️':
                    if(currentPage != q.length - 1) msg.edit({embeds: [q[++currentPage]]})
                    break;
                case '⏩':
                    if(currentPage != q.length - 1) msg.edit({embeds: [q[currentPage = q.length - 1]]})
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
}   

function embedGuilds(guilds){
    let pages = []
    let lastindex = 10
    for(let i=0; i < guilds.length; i += 10){
        let page = guilds.slice(i, lastindex)
        lastindex += 10
        const listGuilds = page.map((guild, index) => `${index+i+1}. **${guild.name}**`).join('\n\n')
        embed = {
            color: [255, 169, 71],
            title: 'Danh sách servers',
            thumbnail: {
                url: 'https://media.discordapp.net/attachments/993937119355609139/993937338268930078/KeiChibi.jpg'
            },
            description: `${listGuilds}`,
            footer:{
                text: `Trang ${i/10 + 1}/${guilds.length % 10 == 0 ? guilds.length/10 : (guilds.length - guilds.length % 10)/10 + 1}`,
                icon_url: 'https://cdn.discordapp.com/attachments/993937119355609139/994442889180500028/clipboard.png'
            }
        }
        pages.push(embed)
    }
    return pages
}