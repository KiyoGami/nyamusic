const config = require('../../config.json')
const pageExcute = require('../../utils/page.js')
module.exports = {
    name: 'queue',
    aliases: ['q'],
    inVoiceChannel: false,
    run: async (client, message) => {
        queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send('Không có bài hát nào trong hàng chờ.')
        const array = embedsQueue(queue.songs)
        pageExcute(message, array)
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
            color: config.botColor,
            title: '~Hàng chờ~',
            thumbnail: {
                url: config.botAvatar
            },
            description: `${listSong}`,
            footer:{
                text: `Trang ${i/10 + 1}/${songs.length % 10 == 0 ? songs.length/10 : (songs.length - songs.length % 10)/10 + 1}`,
                icon_url: config.icon.queue
            }
        }
        queue.push(embed)
    }
    return queue
}