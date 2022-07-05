const Discord = require(`discord.js`)
const { DisTube, default: dist } = require('distube')
const fs = require('fs')
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
    leaveOnStop: false,
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
    if(message.author.id != config.owner) return message.channel.send('Bạn không phải chủ nhân của tôi :Teehee:')
    if (cmd.inVoiceChannel && !message.member.voice.channel) return message.channel.send('Bạn cần vào phòng voice trước')
    cmd.run(client, message, args)
})

client.login(config.token);