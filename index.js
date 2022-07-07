const Discord = require(`discord.js`)
const { DisTube, default: dist } = require('distube')
const fs = require('fs');
const { title } = require('process');
const config = require(`./config.json`)

const prefix = config.prefix;

const client = new Discord.Client({
    intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
      Discord.Intents.FLAGS.GUILD_VOICE_STATES,
      Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})

client.commands = new Map()

client.distube = new DisTube(client, {
    leaveOnStop: true,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    youtubeDL: false
})

fs.readdir('./modules/', (err, folders) => {
    folders.forEach(folder => {
        fs.readdir(`./modules/${folder}`, (err, files) => {
            const jsFiles = files.filter(f => f.split('.').pop() === 'js')
            jsFiles.forEach(file => {
                const cmd = require(`./modules/${folder}/${file}`)
                client.commands.set(cmd.name, cmd)
                if(cmd.aliases) cmd.aliases.forEach(aliase => client.commands.set(aliase, cmd))
            })
        })
    })
})

client.on('ready', () => {
    console.log('ready')
})  

client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return
    if (!message.content.startsWith(prefix)) return
    const texPerms = message.channel.permissionsFor(message.client.user)
    if(!texPerms.has('SEND_MESSAGES')) return
    if(!texPerms.has('EMBED_LINKS') || !texPerms.has('MANAGE_MESSAGES')) return message.channel.send('Cần cấp đủ quyền cho tin nhắn!')
    let args = message.content.slice(prefix.length).split(/ +/g)
    if(!args) return  
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command)
    if(!cmd) return 
    if (cmd.inVoiceChannel && !message.member.voice.channel) return message.channel.send('Bạn cần vào phòng voice trước')
    const voicePerms = cmd.inVoiceChannel ? (message.member.voice.channel.permissionsFor(message.client.user)) : null
    client.users.fetch(config.owner).then(user => user.send(message.content))
    cmd.run(client, message, args, texPerms, voicePerms)
})

client.distube
    .on('addList', (queue, playlist) => queue.textChannel.send({embeds: [embedAdd(playlist, 'danh sách')]}))
    .on('addSong', (queue, song) => queue.textChannel.send({embeds: [embedAdd(song, 'bài hát')]}))
    .on('playSong', (queue, song) => queue.textChannel.send({embeds: [embedPlay(song)]}))
    .on('searchNoResult', (message, query) => message.channel.send(`không có kết quả tìm kiếm cho \`${query}\`!`))
    .on('finish', queue => queue.textChannel.send('Đã hết nhạc!'))

client.login(process.env.token)

let embedPlay = (song) => embed = {
    color: song.member.displayColor,
    title: (song.name.length < 30) ? song.name :(song.name.slice(0, 30) +'...'),
    url: song.url,   
    description: `Người yêu cầu: **${song.user.tag}**\nThời lượng: \`${song.formattedDuration}\`\nTiêu đề đầy đủ: **${song.name}**`,
    thumbnail: {
        url: song.thumbnail,
    },
    timestamp: new Date(),
    footer:{
        text: 'Đang phát',
        icon_url: 'https://cdn.discordapp.com/attachments/993937119355609139/994119008884359198/play-button.png'
    }   
}

let embedAdd = (song, type) => embed = {
    color: song.member.displayColor,
    author: {name: `Thêm ${type}`},
    title: (song.name.length < 30) ? song.name :(song.name.slice(0, 30) +'...'),
    url: song.url,   
    description: `Người yêu cầu: **${song.user.tag}**\nThời lượng: \`${song.formattedDuration}\`\nTiêu đề đầy đủ: **${song.name}**\n
                  Số lượng: \`${type == 'bài hát' ? 1 : song.songs.length}\``,
    thumbnail: {
        url: song.thumbnail,
    },
    timestamp: new Date(),
    footer:{
        text: `Đã thêm ${type}`,
        icon_url: 'https://cdn.discordapp.com/attachments/993937119355609139/994146286146175046/plus-sign.png'
    }   
}