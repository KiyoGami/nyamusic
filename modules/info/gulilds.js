const config = require('../../config.json')
const pageExcute = require('../../utils/page.js')
module.exports = {
    name: 'guilds',
    aliases: ['g', 'servers'],
    inVoiceChannel: false,
    run:async (client, message) => {
        const cache = client.guilds.cache
        const guilds = cache.map(data => data)
        pageExcute(message, embedGuilds(guilds))
    }
}   

function embedGuilds(guilds){
    let pages = []
    let lastindex = 10
    for(let i=0; i < guilds.length; i += 10){
        let page = guilds.slice(i, lastindex)
        lastindex += 10
        const listGuilds = page.map((guild, index) => `${index+i+1}. \`${guild.name}\``).join('\n\n')
        embed = {
            color: [255, 169, 71],
            title: 'Danh sách servers',
            thumbnail: {
                url: config.botAvatar
            },
            description: `${listGuilds}`,
            footer:{
                text: `Trang ${i/10 + 1}/${guilds.length % 10 == 0 ? guilds.length/10 : (guilds.length - guilds.length % 10)/10 + 1}`,
                icon_url: config.icon.guilds
            }
        }
        pages.push(embed)
    }
    return pages
}