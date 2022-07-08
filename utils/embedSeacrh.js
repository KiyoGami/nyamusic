const config = require('../config.json')
module.exports = (song, event, index) => embed = {
    color: config.botColor,
    author: {
        name: event,
    },
    title: (song.name.length < 30) ? song.name :(song.name.slice(0, 30) +'...'),   
    url: song.url,
    thumbnail: {
        url: song.thumbnail,
    },
    description: `Thời lượng: \`${song.formattedDuration}\`
                  Tiêu đề đầy đủ: **${song.name}**
                  Ví trị: \`${index}\`
                  Chat: \`vị trí\` | see \`vị trí\` | deny`,
    timestamp: new Date(),
    footer: {
        text: event,
        icon_url: config.icon.search
    }
}