const config = require('../../config.json')
const pageExcute = require('../../utils/page.js')
const embedSeacrh = require('../../utils/embedSeacrh.js')
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
                await message.channel.send(`Bạn có **1 phút** để:
                                            -Chat \`số thứ tự\` bài hát muốn phát.
                                            -Chat \`see\` + \`số thứ tự\` để xem chi tiết.
                                            -Chat \`deny\` để huỷ ...`)
                filter = (msg) => msg.author.id != client.application.id
                const collector = message.channel.createMessageCollector({filter, time: 60000})

                collector.on('collect',async msg => {
                    const args = msg.content.split(/ +/g)
                    const string = args.shift().toLowerCase()
                    if(string == 'deny') return await collector.stop()
                    else if(string == 'see'){
                        if(!args.length) return
                        num = Number(args.shift())
                        if(isNaN(num) || num >= songs.length) message.channel.send('Số không hợp lệ!')
                        else message.channel.send({embeds: [embedSeacrh(songs[num], 'Tìm kiếm', num)]})
                    }else{
                        num = Number(string)
                        if(isNaN(num) || num >= songs.length) return message.channel.send('Số không hợp lệ! Vui lòng nhập lại hoặc \`deny\` để dừng')
                        else await client.distube.play(message.member.voice.channel, songs[num].url, {
                            member: message.member,
                            textChannel: message.channel,
                        })
                        return collector.stop()
                    }
                })

                collector.on('end', async () => await message.reply({content: 'Đã dừng tìm kiếm!', allowedMentions: {userReplied: false}})) 
            })
            .catch((err) => message.channel.send('Không tìm thấy bài hát yêu cầu!'))
    }
}  

function embedsSerach(songs){
    let queue = []
    let lastindex = 6
    for(let i=0; i < songs.length; i += 6){
        let page = songs.slice(i, lastindex)
        lastindex += 6  
        const listSong = page.map((song, index) => `${index+i}. **${song.name}** - \`${song.formattedDuration}\`}`).join('\n\n')
        embed = {
            color: config.botColor,
            title: '~Kết quả tìm kiếm~',
            thumbnail: {
                url: config.botAvatar
            },
            description: `${listSong}`,
            footer:{
                text: `Trang ${i/6 + 1}/${songs.length % 6 == 0 ? songs.length/6 : (songs.length - songs.length % 6 )/6   + 1}`,
                icon_url: config.icon.search
            }
        }
        queue.push(embed)
    }
    return queue
}