const Discord = require(`discord.js`)
const { DisTube, default: dist } = require('distube')
const fs = require('fs');
const { clearLine } = require('readline');
const config = require(`./config.json`)

const prefix = config.prefix;

const client = new Discord.Client({
    intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
      Discord.Intents.FLAGS.GUILD_VOICE_STATES,
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
    console.log(`${client.user.username} is ready to play music.`)
})  

client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return
    if (!message.content.startsWith(prefix)) return
    let args = message.content.slice(prefix.length).split(/ +/g)
    if(!args) return  
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command)
    if(!cmd) return 
    if (cmd.inVoiceChannel && !message.member.voice.channel) return message.channel.send('Bạn cần vào phòng voice trước')
    cmd.run(client, message, args)
})

client.distube
    .on('addList', (queue, playlist) =>
        queue.textChannel.send(`Đã thêm playlist \`${playlist.name}\` (${playlist.songs.length} bài hát) vào hàng chờ`)
    )
    .on('addSong', (queue, song) =>
        queue.textChannel.send(`Đã thêm ${song.name} - \`${song.formattedDuration}\` vào hàng chờ bởi ${song.user.username}`)
    )
    .on('playSong', (queue, song) =>
        queue.textChannel.send(`Đang phát \`${song.name}\` - \`${song.formattedDuration}\`\nyêu cầu: ${song.user.username}`)
    )
    // .on('empty', channel => channel.send('Không còn ai nghe nhạc nữa, mị đi đây :< ...'))
    .on('searchNoResult', (message, query) => message.channel.send(`không có kết quả tìm kiếm cho \`${query}\`!`))
    .on('finish', queue => queue.textChannel.send('Đã hết nhạc!'))
client.login(process.env.token);