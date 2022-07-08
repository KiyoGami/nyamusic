const config = require('../../config.json')
const pageExcute = require('../../utils/page.js')
module.exports = {
    name: 'search',
    aliases: ['ss'],
    inVoiceChannel: true,
    run:async (client, message, args) => {
        string = args.join(' ')
        if(!string.length) return message.channel.send('Hãy nhập bài hát cần tìm!')
        client.distube.search(string, {limit: 20})
            .then(async (songs) => {
                pageExcute(message, embedsSerach(songs))
                await message.channel.send(`Bạn có **1 phút** để nhập số thứ tự bài hát muốn phát (1 số mỗi lần).\nChat \`stop\` để dừng tìm kiếm...`)
                filter = (msg) => msg.author.id != client.application.id
                const collector = message.channel.createMessageCollector({filter, time: 60000})

                collector.on('collect',async msg => {
                    const string = msg.content.split(/ +/g).shift().toLowerCase()
                    if(string == 'stop') return await collector.stop()
                    num = Number(string)
                    if(isNaN(num) || num >= songs.length) message.channel.send('Số không hợp lệ! Vui lòng nhập lại hoặc \`stop\` để dừng')
                    else return await client.distube.play(message.member.voice.channel, songs[num].name, {
                        member: message.member,
                        textChannel: message.channel,
                    })
                })

                collector.on('end', async () => await message.reply({content: 'Đã dừng tìm kiếm!', allowedMentions: {userReplied: false}})) 
            })
            .catch(err => message.channel.send('Không có kết quả tìm kiếm!'))
    }
}  

function embedsSerach(songs){
    let queue = []
    let lastindex = 10
    for(let i=0; i < songs.length; i += 10){
        let page = songs.slice(i, lastindex)
        lastindex += 10
        const listSong = page.map((song, index) => `${index+i}. **${song.name}** - \`${song.formattedDuration}\`}`).join('\n\n')
        embed = {
            color: config.botColor,
            title: '~Kết quả tìm kiếm~',
            thumbnail: {
                url: config.botAvatar
            },
            description: `${listSong}`,
            footer:{
                text: `Trang ${i/10 + 1}/${songs.length % 10 == 0 ? songs.length/10 : (songs.length - songs.length % 10)/10 + 1}`,
                icon_url: config.icon.search
            }
        }
        queue.push(embed)
    }
    return queue
}