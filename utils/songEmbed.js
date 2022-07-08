module.exports = (song, icon, event, isNum) => embed = {
    color: song.member.displayColor,
    author: {
        name: event,
    },
    title: (song.name.length < 30) ? song.name :(song.name.slice(0, 30) +'...'),   
    url: song.url,
    thumbnail: {
        url: song.thumbnail,
    },
    description: `Người yêu cầu: **${song.user.tag}**\nThời lượng: \`${song.formattedDuration}\`
                  Tiêu đề đầy đủ: **${song.name}**
                  ${isNum ? `Số lượng: \`${song.songs.length}\``: ''}`,
    timestamp: new Date(),
    footer: {
        text: event,
        icon_url: icon
    }
}