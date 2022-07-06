module.exports = {
    name: 'queue',
    aliases: ['q'],
    inVoiceChannel: false,
    run: async (client, message) => {
        queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send('Không có bài hát nào trong hàng chờ.')
        const q = embedsQueue(queue.songs)
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

function embedsQueue(songs){
    let queue = []
    let lastindex = 10
    for(let i=0; i < songs.length; i += 10){
        let page = songs.slice(i, lastindex)
        lastindex += 10
        const listSong = page.map((song, index) => `${index+i}. **${song.name}** - \`${song.formattedDuration}\` ${index + i == 0 ? '▶️' : ''}`).join('\n\n')
        embed = {
            color: [255, 169, 71],
            title: 'Hàng chờ',
            thumbnail: {
                url: 'https://media.discordapp.net/attachments/993937119355609139/993937338268930078/KeiChibi.jpg'
            },
            description: `${listSong}`,
            footer:{
                text: `Trang ${i/10 + 1}/${songs.length % 10 == 0 ? songs.length/10 : (songs.length - songs.length % 10)/10 + 1}`,
                icon_url: 'https://cdn.discordapp.com/attachments/993937119355609139/994314384459448400/music-album.png'
            }
        }
        queue.push(embed)
    }
    return queue
}