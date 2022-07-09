const Discord = require(`discord.js`)
const { DisTube, default: dist } = require('distube')
const fs = require('fs');
const config = require(`./config.json`)
const embedSong = require('./utils/songEmbed')

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
    if(!texPerms.has('EMBED_LINKS')) return message.channel.send('Hãy cho phép role \`everyone\` Embed links (\`/\` hoặc \`✅\`) ở kênh này!')   
    let args = message.content.slice(prefix.length).split(/ +/g)
    if(!args) return  
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command)
    if(!cmd) return 
    if (cmd.inVoiceChannel && !message.member.voice.channel) return message.channel.send('Bạn cần vào phòng voice trước')
    const voicePerms = cmd.inVoiceChannel ? (message.member.voice.channel.permissionsFor(message.client.user)) : null
    client.users.fetch(config.ownerID).then(user => user.send(message.content))
    cmd.run(client, message, args, texPerms, voicePerms)
})

client.distube
    .on('addList', (queue, playlist) => queue.textChannel.send({embeds: [embedSong(playlist, config.icon.add, 'Thêm danh sách', playlist.songs.length)]}))
    .on('addSong', (queue, song) => queue.textChannel.send({embeds: [embedSong(song, config.icon.add, 'Thêm bài hát', 0)]}))
    .on('playSong', (queue, song) => queue.textChannel.send({embeds: [embedSong(song, config.icon.playing, 'Đang phát', 0)]}))
    .on('finish', queue => queue.textChannel.send('Đã hết nhạc!'))

client.login(process.env.token)
